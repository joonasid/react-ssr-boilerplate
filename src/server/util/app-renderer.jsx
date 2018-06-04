import React
  from 'react'
import types
  from 'prop-types'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import {Provider} from 'react-redux'
import {routerForExpress} from 'redux-little-router'
import {
  renderToString,
  renderToStaticMarkup
} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import Promise
  from 'bluebird'

import routes
  from '../../client/routes'
import {getReducers} from '../../client/store'
import App
  from '../../client/components/StatefulApp'

const InitialState = ({state}) => (
  <div
    id="initialState"
    data-state={JSON.stringify(state)}
    style={{display: 'none'}}/>
)

InitialState.propTypes = {
  state: types.any
}

/**
 * @typedef {object} PageData the page metadata
 * @param {string} baseUrl the app baseUrl (protocol, host name and port)
 * @param {string} url the page url
 * @param {string} [canonicalUrl] the page canonical URL, if different from current url
 * @param {string} title the page title
 * @param {string} description the page description
 */

/**
 * @typedef {object} RenderedPage
 * @property {string} html the application rendered into html markup
 * @property {object} state the app initial state rendered into html markup
 * @property {PageData} page the page metadata
 * @property {string} css the application stylesheets rendered into css markup
 */

/**
 * @callback PageRenderer
 * @param {PageData} page the page metadata
 * @param {object} initialState the application initial state
 * @return {Promise<RenderedPage>} the rendered page data, ready to be inserted into the page template
 */

export default class AppRenderer {
  constructor({log, config: {isDevelopment}}) {
    this.log = log
    this.trace = isDevelopment
  }
  
  /**
   * Get app renderer for the specified request.
   *
   * @param request the http request we're serving (used to determine the correct route).
   * @return {PageRenderer} the renderer, which accepts the app intial state
   */
  getRendererForRequest = (request) => (page, initialState) => {
    if (this.trace) {
      this.log.debug('Rendering app with initial state', initialState)
    }
    const begin = process.hrtime()
    
    const {reducer, middleware, enhancer} = routerForExpress({
      routes,
      request
    })
    const store = createStore(
      getReducers({router: reducer}),
      initialState,
      compose(enhancer, applyMiddleware(middleware))
    )
    
    return new Promise((resolve, reject) => {
      try {
        const sheet = new ServerStyleSheet()
        const html = renderToString(sheet.collectStyles(
          <Provider
            store={store}>
            <App/>
          </Provider>
        ))
        const state = renderToStaticMarkup(
          <InitialState
            state={store.getState()}/>)
        const css = sheet.getStyleTags()
        
        const duration = process.hrtime(begin)
        if (this.trace) {
          this.log.debug(`App SSR took ${duration} sec.`)
        }
        
        resolve({
          page,
          state,
          html,
          css
        })
      } catch (e) {
        this.log.error(`Error rendering page`, e)
        reject(e)
      }
    })
  }
}
