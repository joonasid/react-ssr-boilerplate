import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router'
import { find } from 'lodash'

import Logger from './services/logger'
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

  const {isDevelopment} = initialState.config
  if (isDevelopment) {
    window.INITIAL_STATE = initialState
  }

  const log = new Logger({ config: initialState.config })
  const services = { log }
  const context = { services }

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
      isDevelopment
        ? composeWithDevTools(enhancer, applyMiddleware(routerMiddleware, sagaMiddleware))
        : compose(enhancer, applyMiddleware(routerMiddleware, sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(getSagas, context)
  }
  
  const storageKeyWhitelist = ['foo']
  window.addEventListener('storage', (e) => {
    const {key, oldValue, newValue} = e
    if (find(storageKeyWhitelist, (s) => s === key)) {
      store.dispatch({type: 'LOCAL_STORAGE_CHANGED',
        payload: {
          key,
          oldValue,
          newValue
        }
      })
    }
  })
  
  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }

  const checkDeviceType = () => {
    const width = window.innerWidth
    const newDeviceType = getDeviceType(width)
    const deviceType = store.getState().view.deviceType
    if (newDeviceType !== deviceType) {
      store.dispatch(viewActions.changeDeviceType(newDeviceType))
    }
  }
  checkDeviceType() // perform once to reset to current window size
  
  ReactDOM.hydrate(
    <Provider store={store}>
      <App/>
    </Provider>,
    rootElement
  )

  window.addEventListener('resize', checkDeviceType)
}
