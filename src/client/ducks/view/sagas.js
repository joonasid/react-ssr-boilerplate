import { fork, takeEvery } from 'redux-saga/effects'

import types from './types'
import {storeDeviceType} from '../../util/device-type'

function * handleDeviceTypeChange(context, { payload }) {
  const {services: {log}} = context

  log.debug('Oi! Device type changed!', payload)
  storeDeviceType(payload)
  yield 0
}

function * watchDeviceTypeChange(context) {
  yield takeEvery(types.CHANGE_DEVICE_TYPE, handleDeviceTypeChange, context)
}

export default (context) => {
  return [
    fork(watchDeviceTypeChange, context)
  ]
}
