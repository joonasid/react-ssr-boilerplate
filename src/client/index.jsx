import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router'

import App from './components/StatefulApp'
import routes from './routes'
import { getReducers, getSagas } from './store'
import { viewActions } from './ducks/view/index'
import { getDeviceType } from './constants/styles'

if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root')
  const initialStateElement = document.getElementById('initialState')
  const initialState = JSON.parse(initialStateElement.getAttribute('data-state'))
  if (initialState.config) {
    initialState.config.isInClientSide = true
  }

  window.INITIAL_STATE = initialState

  const {
    reducer: router,
    middleware: routerMiddleware,
    enhancer
  } = routerForBrowser({ routes })
  const sagaMiddleware = createSagaMiddleware()
  const store = {
    ...createStore(
      getReducers({ router }),
      initialState,
      composeWithDevTools(enhancer, applyMiddleware(routerMiddleware, sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(getSagas)
  }

  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }

  ReactDOM.hydrate(
    <Provider store={store}>
      <App/>
    </Provider>,
    rootElement
  )

  window.addEventListener('resize', () => {
    const width = window.innerWidth
    const newDeviceType = getDeviceType(width)
    const deviceType = store.getState().view.get('deviceType')
    if (newDeviceType !== deviceType) {
      store.dispatch(viewActions.changeDeviceType(newDeviceType))
    }
  })
}
