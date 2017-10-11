import tracer from 'tracer'

export default class Logger {
  constructor({ config: { server: { logLevel }} }) {
    this.log = tracer.colorConsole({ level: logLevel })
  }

  debug(...msg) {
    this.log.debug(msg)
  }

  info(...msg) {
    this.log.info(msg)
  }

  warn(...msg) {
    this.log.warn(msg)
  }

  error(...msg) {
    this.log.error(msg)
  }
}
