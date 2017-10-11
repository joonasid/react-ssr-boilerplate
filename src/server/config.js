import { defaultsDeep }  from 'lodash'

import assets from '../../build/asset-manifest.json'
import { version } from '../../package.json'

const defaults = {
  development: {
    isDevelopment: true,
    server: {
      listenAddress: '127.0.0.1',
      port: '1337',
      baseUrl: 'http://localhost:1337',
      routes: {
        frontPage: {
          cacheTTL: '00:01:00'
        },
        sitemap: {
          cacheTTL: '00:01:00'
        }
      },
      logLevel: 'debug'
    }
  },
  test: {
    isDevelopment: true,
    server: {
      listenAddress: '127.0.0.1',
      port: '1337',
      baseUrl: 'http://localhost:1337',
      routes: {
        frontPage: {
          cacheTTL: '00:01:00'
        },
        sitemap: {
          cacheTTL: '00:01:00'
        }
      },
      logLevel: 'debug'
    }
  },
  production: {
    isDevelopment: false,
    server: {
      listenAddress: '127.0.0.1',
      port: '1337',
      baseUrl: 'http://localhost:1337',
      routes: {
        frontPage: {
          cacheTTL: '00:15:00'
        },
        sitemap: {
          cacheTTL: '24:00:00'
        }
      },
      logLevel: 'info'
    }
  }
}

const env = process.env.APP_ENV || process.env.NODE_ENV
const envDefaults = defaults[env] || defaults.development

export default defaultsDeep({
  env,
  version,
  client: {
    assets
  },
  server: {
    listenAddress: process.env.SERVER_LISTEN_ADDRESS,
    baseUrl: process.env.SERVER_BASE_URL,
    port: process.env.SERVER_LISTEN_PORT,
    routes: {
      frontPage: {
        cacheTTL: process.env.SERVER_ROUTES_FRONT_PAGE_CACHE_TTL
      },
      sitemap: {
        cacheTTL: process.env.SERVER_ROUTES_SITEMAP_CACHE_TTL
      }
    },
    logLevel: process.env.SERVER_LOG_LEVEL
  }
}, envDefaults)
