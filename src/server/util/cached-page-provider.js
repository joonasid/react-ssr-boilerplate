/**
 * @typedef {object} RenderedPage
 * @property {string} body the rendered response body
 * @property {string} [contentType=text/html] the rendered response Content-Type
 */

/**
 * @callback Renderer
 * @param {object} [req] the http request we're serving
 * @param {object} [res] the http response we're creating
 * @param {Function} [next] the next handler in the router middleware chain
 * @return {RenderedPage} the rendered page data
 */

export default class CachedPageProvider {

  constructor({ cache, namespace }) {
    this.cache = cache
    this.namespace = namespace
  }

  getCacheKey = (req) => ({
    path: req.path
  })

  /**
   * Serve cached page content, using the provided function to populate the cache
   *
   * @param {number} ttl the cached page time-to-live (in milliseconds)
   * @param {Renderer} renderer the page renderer
   * @return {Function} the Express route handler
   */
  serveCachedContent = (ttl, renderer) => (req, res, next) => {
    const cacheKey = this.getCacheKey(req)
    Promise.resolve(this.cache.get(this.namespace, cacheKey))
      .then((pageData) => {
        if (pageData) {
          return pageData
        }
        pageData = renderer(req, res, next)
        if (ttl) {
          this.cache.put(this.namespace, cacheKey, pageData, ttl)
        }
        return pageData
      })
      .then(({ body, contentType }) => {
        const cacheControl = ttl ? `public,s-maxage=${ttl},max-age=${Math.ceil(ttl / 3)}` : 'no-cache'
        res.set('Cache-Control', cacheControl)
        if (contentType) {
          res.set('Content-Type', contentType)
        }
        res.send(body)
      })
      .catch((error) => next(error))
  }
}
