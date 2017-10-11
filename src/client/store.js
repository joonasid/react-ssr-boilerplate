import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'
import { fromJS } from 'immutable'

import config from './ducks/config'
import page from './ducks/page'
import { routerSagas } from './ducks/router/index'

export const getReducers = (additionalReducers) => combineReducers({
  config,
  page,
  ...additionalReducers
})

export function * getSagas () {
  yield all([
    fork(routerSagas.watchLocationChange)
  ])
}

export const getImmutableState = (state) => fromJS(state).toObject()
