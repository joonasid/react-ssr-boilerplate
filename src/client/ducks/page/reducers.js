import { fromJS } from 'immutable'

import types from './types'
import constants from './constants'

export const initialState = {
  page: constants.PAGE_LANDING
}

export default (state = fromJS(initialState), { type, payload }) => {
  switch (type) {
    case types.GO_TO_PAGE: {
      return state.set('page', payload)
    }
    default: {
      return state
    }
  }
}
