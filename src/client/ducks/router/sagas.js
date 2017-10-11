/* eslint-disable no-console */
import { put, takeEvery } from 'redux-saga/effects'

import { routes } from '../../routes'
import types from './types'
import { pageActions } from '../page/index'

function * handleLocationChange ({ payload }) {
  const { route } = payload

  if (route) {
    switch (route) {
      case routes.FRONT_PAGE:
        yield put(pageActions.goToLandingPage())
        break

      default:
        console.log(`Unknown route: ${route}`)
    }
  }
}

function * watchLocationChange () {
  yield takeEvery(types.LOCATION_CHANGED, handleLocationChange)
}

export default {
  watchLocationChange
}
