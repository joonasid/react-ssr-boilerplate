import produce from 'immer'
import types from './types'

export const initialState = {
  lang: 'en',
  deviceType: 'mobile'
}

export default (state  = initialState, { type, payload }) => produce(state, (draft) => {
  switch (type) {
    case types.CHANGE_DEVICE_TYPE: {
      draft.deviceType = payload
    }
  }
})
