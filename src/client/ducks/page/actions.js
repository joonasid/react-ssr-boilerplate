import types from './types'
import constants from './constants'

const goToLandingPage = () => ({
  type: types.GO_TO_PAGE,
  payload: constants.PAGE_LANDING
})

export default {
  goToLandingPage
}
