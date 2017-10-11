import { fromJS } from 'immutable'

export const initialState = {
  isInClientSide: true,
  isDevelopment: false,
  version: '1.0.0'
}

export default (state = fromJS(initialState), { type }) => {
  switch (type) {
    default:
      return state
  }
}
