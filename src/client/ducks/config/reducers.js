export const initialState = {
  isInClientSide: true,
  isDevelopment: false,
  version: '1.0.0'
}

export default (state = initialState, { type }) => {
  switch (type) {
    default:
      return state
  }
}
