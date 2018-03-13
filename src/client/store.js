import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import config from './ducks/config'
import page from './ducks/page'
import view from './ducks/view'
import { routerSagas } from './ducks/router/index'

export const getReducers = (additionalReducers) => combineReducers({
  config,
  page,
  view,
  ...additionalReducers
})

export function * getSagas () {
  yield all([
    fork(routerSagas.watchLocationChange)
  ])
}

