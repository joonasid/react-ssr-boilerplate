import path from 'path'
import express from 'express'
import reload from 'reload'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'

import config from './config'
import Logger from './util/logger'
import InMemoryCache from './services/cache/in-memory-cache'
import FrontPageRoutes from './routes/front-pages'
import SiteMetadataRoutes from './routes/site-metadata'
import AppRenderer from './util/app-renderer'
import CachedPageProvider from './util/cached-page-provider'

const { version } = config
const buildDir = path.join(__dirname, '../../build')
const publicDir = path.join(__dirname, '../../public')

// init services
const log = new Logger({ config })
const cache = new InMemoryCache({ log })
const renderer = new AppRenderer({ log, config })
const cacheProvider = new CachedPageProvider({ cache, namespace: 'routes' })

const { isDevelopment } = config

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true)
app.use(compression())

if (isDevelopment) {
  log.debug('Enabling CORS because we\'re in development mode')
  app.use(cors())

  app.use((req, res, next) => {
    log.debug(`${req.method} ${req.path}`)
    next()
  })

  app.use(morgan('dev'))

  // enable automatic browser reloads on server restart
  reload(app)

} else {
  app.use(morgan())
}

// init routes
const frontPageRoutes = new FrontPageRoutes({ config, log, renderer })
const siteMetadataRoutes = new SiteMetadataRoutes({ config, log, cacheProvider })

// app pages
frontPageRoutes.mount(app)

// site metadata / search engine optimization
siteMetadataRoutes.mount(app)

// static resources
app.use(express.static(buildDir))
app.use('/public', express.static(publicDir))

// app keepalive endpoint
app.get('/ping', (req, res) => {
  res.json({
    version
  })
})

// handler for page-not-found -requests
app.use(function (req, res, next) {
  res.status(404).sendFile(publicDir + '/404.html')
})

if (!isDevelopment) {
  app.use(function (err, req, res, next) {
    log.error(err.stack)
    res.status(500).sendFile(publicDir + '/500.html')
  })
}

export default app
