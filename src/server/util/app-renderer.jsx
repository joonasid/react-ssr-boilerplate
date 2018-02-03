import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerForExpress } from 'redux-little-router'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

import html from '../views/html'
import routes from '../../client/routes'
import { getReducers, getImmutableState } from '../../client/store'
import App from '../../client/components/StatefulApp'

export default class AppRenderer {
  constructor ({ log, config: { isDevelopment, server: { baseUrl } } }) {
    this.log = log
    this.trace = isDevelopment
    this.baseUrl = baseUrl
  }

  streamResponseForRequest = (request, response) => (page, initialState) => {
    const preHtml = html.pre(page, initialState);
    const postHtml = html.post

    response.charset = 'utf-8'
    response.header('Content-Type', 'text/html')
    response.write(preHtml)

    const { reducer, middleware, enhancer } = routerForExpress({ routes, request })
    const store = createStore(
      getReducers({ router: reducer }),
      getImmutableState(initialState),
      compose(enhancer, applyMiddleware(middleware))
    )

    const sheet = new ServerStyleSheet()
    const jsx = sheet.collectStyles(
      <Provider store={store}>
        <App/>
      </Provider>
    )
    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

    stream.pipe(response, { end: false })
    stream.on('end', () => response.end(postHtml))
  }
}
