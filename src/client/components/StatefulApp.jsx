import { connect } from 'react-redux'
import { mapValues } from 'lodash'

import App from './App'

const mapStateToProps = (state) => mapValues(state, (value) => value)

export default connect(mapStateToProps)(App)
