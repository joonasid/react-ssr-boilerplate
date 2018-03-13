/* eslint-disable no-console */

class ClientSideLogger {
  constructor({ config: { isDevelopment }}) {
    this.isDevelopment = isDevelopment
  }

  debug() {
    if (this.isDevelopment) {
      console.log(...arguments)
    }
  }

  info() {
    console.log(...arguments)
  }

  error() {
    console.error(...arguments)
  }
}

export default ClientSideLogger
