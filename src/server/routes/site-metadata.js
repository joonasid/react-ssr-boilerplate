import path from 'path'

import moment from 'moment'
const { duration } = moment

const DEFAULT_SITEMAP_TTL = '24:00:00'

const HUMANS_TXT_FILE_PATH = path.join(__dirname, '../../../public/humans.txt')

export default class SiteMetadataRoutes {

  constructor ({ log, config, cacheProvider }) {
    this.log = log
    this.config = config
    this.cacheProvider = cacheProvider

    const { server: { routes: { sitemap: { cacheTTL } } } } = config
    this.resourceTTL = duration(cacheTTL).asMilliseconds()
    if (this.resourceTTL <= 0) {
      this.resourceTTL = duration(DEFAULT_SITEMAP_TTL).asMilliseconds()
      this.log.warn(`Configured front-page cache TTL "${cacheTTL}" is invalid! Using default of ${this.resourceTTL} ms instead.`)
    }

    this.serveSitemap = this.cacheProvider.serveCachedContent(this.resourceTTL, () => {
      const { server: { baseUrl }} = this.config
      const now = moment().format()
      const allEntries = []
      // add entry for front page
      allEntries.push({
        loc: `${baseUrl}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8
      })

      const urls = allEntries.map(({ loc, lastmod, changefreq, priority }) => `
      <url>
        <loc>${loc}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
      `)

      return {
        body: `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`,
        contentType: 'application/xml'
      }
    })

    this.serveRobotsTxt = this.cacheProvider.serveCachedContent(this.resourceTTL, () => {
      const { server: { baseUrl } } = this.config
      return {
        body: `
      User-agent: *
      Sitemap: ${baseUrl}/sitemap.xml
      `,
        contentType: 'text/plain'
      }
    })
  }

  serveHumansTxt = (req, res) => res.sendFile(HUMANS_TXT_FILE_PATH)

  mount (router) {
    router.get('/robots.txt', this.serveRobotsTxt)
    router.get('/sitemap.xml', this.serveSitemap)
    router.get('/humans.txt', this.serveHumansTxt)
  }
}
