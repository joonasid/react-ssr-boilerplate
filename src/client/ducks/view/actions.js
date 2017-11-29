import types from './types'

const changeDeviceType = (deviceType) => ({
  type: types.CHANGE_DEVICE_TYPE,
  payload: deviceType
})

export default {
  changeDeviceType
}
