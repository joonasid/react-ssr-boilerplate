import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import config from './ducks/config'
import page from './ducks/page'
import view from './ducks/view'
import { forkSagas as forkRouterSagas } from './ducks/router/index'
import { forkSagas as forkViewSagas } from './ducks/view'

export const getReducers = (additionalReducers) => combineReducers({
  config,
  page,
  view,
  ...additionalReducers
})

export function * getSagas (context) {
  yield all([
    ...forkRouterSagas(context),
    ...forkViewSagas(context)
  ])
}
