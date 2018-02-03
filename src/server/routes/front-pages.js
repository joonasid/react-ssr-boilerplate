import Promise from 'bluebird'

import config from '../config'
import { initialState as initialPage } from '../../client/ducks/page/index'
import { initialState as initialView } from '../../client/ducks/view/reducers'
import { routes } from '../../client/routes'

const SERVER_SIDE_CONFIG = {
  isInClientSide: false,
  isDevelopment: config.isDevelopment,
  version: config.version
}

export default class FrontPages {
  constructor ({ log, config, renderer }) {
    this.renderer = renderer
    this.config = config
    this.log = log

    this.getFrontPage = (req, res) => this.getAppState().then(this.streamApp(req, res))
  }

  getPageDescriptor = (state) => {
    const { server: { baseUrl } } = this.config

    const title = 'React SSR boilerplate'
    const description = 'Boilerplate for server-side rendered React with Redux'

    const url = '/'
    const canonicalUrl = `${baseUrl}${url}`

    return { baseUrl, canonicalUrl, url, title, description }
  }

  streamApp = (req, res) => (state) => {
    const page = this.getPageDescriptor(state)
    const renderApp = this.renderer.streamResponseForRequest(req, res)
    return renderApp(page, state)
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
