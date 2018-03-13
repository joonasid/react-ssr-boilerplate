import produce from 'immer'
import types from './types'
import constants from './constants'

export const initialState = {
  page: constants.PAGE_LANDING
}

export default (state = initialState, { type, payload }) => produce(state, (draft) => {
  switch (type) {
    case types.GO_TO_PAGE: {
      draft.page = payload
    }
  }
})
