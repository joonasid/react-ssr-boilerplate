import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'

import moment from 'moment'
import { template } from 'lodash'

import config from '../config'
import { initialState as initialPage } from '../../client/ducks/page/index'
import { initialState as initialView } from '../../client/ducks/view/reducers'
import { routes } from '../../client/routes'

const { client: { assets } } = config
const { duration } = moment

const SERVER_SIDE_CONFIG = {
  isInClientSide: false,
  isDevelopment: config.isDevelopment,
  version: config.version
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const DEFAULT_PAGE_TTL = 10 * MINUTE

const appTemplate = template(fs.readFileSync(path.join(__dirname, '../views/index.ejs')))

const renderTemplate = (template) => ({ page, html, state, css }) => {
  const { baseUrl, url, canonicalUrl, title, description } = page
  const context = {
    config,
    site: {
      baseUrl,
      canonicalUrl,
      url,
      title,
      description,
      bundles: {
        js: assets['main.js'],
        css: assets['main.css']
      }
    },
    view: {
      lang: 'fi'
    },
    app: {
      html,
      state,
      css
    }
  }
  return template(context)
}

export default class FrontPages {

  constructor ({ log, config, renderer, cacheProvider }) {
    this.renderer = renderer
    this.cacheProvider = cacheProvider
    this.config = config
    this.log = log

    const { server: { routes: { frontPage: { cacheTTL } } } } = config
    const configuredTTL = duration(cacheTTL)
    this.pageTTL = configuredTTL.asMilliseconds()
    if (this.pageTTL <= 0) {
      this.log.warn(`Configured front-page cache TTL "${this.cacheTTL}" is invalid! Using default of ${DEFAULT_PAGE_TTL} ms instead.`)
      this.pageTTL = DEFAULT_PAGE_TTL
    }

    this.getFrontPage = this.cacheProvider.serveCachedContent(this.pageTTL, (req) =>
      this.getAppState().then(this.serveApp(req))
    )
  }

  getPageDescriptor = (state) => {
    const { server: { baseUrl } } = this.config

    const title = 'React SSR boilerplate'
    const description = 'Boilerplate for server-side rendered React with Redux'

    const url = '/'
    const canonicalUrl = `${baseUrl}${url}`

    return { baseUrl, canonicalUrl, url, title, description }
  }

  serveApp = (req) => (state) => {
    const page = this.getPageDescriptor(state)
    const renderApp = this.renderer.getRendererForRequest(req)
    return Promise.resolve(renderApp(page, state))
      .then(renderTemplate(appTemplate))
      .then((html) => ({ body: html }))
  }

  getAppState = () => {
    return this.prepareInitialState().then(this.finalizeAppState)
  }

  getPage = () => ({
    ...initialPage
  })

  getView = () => ({
    ...initialView
  })

  /**
   * Prepare the app initial state, gathering all the redux stores' initial states.
   */
  prepareInitialState = () => Promise.props({
    page: this.getPage(),
    view: this.getView()
  })

  /**
   * Finalize the app state
   */
  finalizeAppState = (state) => ({
    ...state,
    config: SERVER_SIDE_CONFIG
  })

  mount (router) {
    router.get(routes.FRONT_PAGE, this.getFrontPage)
  }
}
