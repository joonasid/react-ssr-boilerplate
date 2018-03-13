import types from './types'

export const initialState = {
  lang: 'en',
  deviceType: 'mobile'
}

export default (state  = initialState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_DEVICE_TYPE: {
      return state.set('deviceType', payload)
    }
    default: {
      return state
    }
  }
}
