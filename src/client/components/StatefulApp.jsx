import { connect } from 'react-redux'
import { mapValues } from 'lodash'

import App from './App'

/**
 * Our state variables are Immutable, with the exception of the redux-little-routers' "router"
 * property which is plain JS (blasphemy!)
 */
const REDUX_ROUTER_KEY = 'router'

const valuesToJS = (value, key) => {
  return key === REDUX_ROUTER_KEY
    ? value
    : value
      ? value.toJS()
      : value
}

const mapStateToProps = (state) => mapValues(state, valuesToJS)

export default connect(mapStateToProps)(App)
