import { fork, put, takeEvery } from 'redux-saga/effects'

import { routes } from '../../routes'
import types from './types'
import { pageActions } from '../page/index'

function * handleLocationChange (context, { payload }) {
  const {services: {log}} = context
  const { route } = payload

  log.debug('Oi! Route changed', payload)

  if (route) {
    switch (route) {
      case routes.FRONT_PAGE:
        yield put(pageActions.goToLandingPage())
        break

      default:
        log.warn(`Unknown route: ${route}`)
    }
  }
}

function * watchLocationChange (context) {
  yield takeEvery(types.LOCATION_CHANGED, handleLocationChange, context)
}

export default (context) => {
  return [
    fork(watchLocationChange, context),
  ]
}
