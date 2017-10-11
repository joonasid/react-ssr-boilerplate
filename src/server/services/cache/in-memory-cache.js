import cache from 'memory-cache'
import hash from 'node-object-hash'

export default class InMemoryCache {
  constructor({ log }) {
    this.log = log
    this.serializer = hash()
  }

  getCacheKey(namespace = 'global', key) {
    if (!key) {
      this.log.warn('Invalid cache key specified', namespace, key)
      key = 'null'
    }
    const serializedKey = typeof key === 'string' ? key : this.serializer.hash(key)
    return `${namespace}-${serializedKey}`
  }

  get(namespace, key) {
    const cacheKey = this.getCacheKey(namespace, key)
    const ret = cache.get(cacheKey)
    this.log.debug(`Cache ${ret ? 'hit' : 'miss'}: ${cacheKey}`)
    return ret
  }

  put(namespace, key, value, ttl, timeoutCb) {
    const cacheKey = this.getCacheKey(namespace, key)
    this.log.debug(`Cache store ${cacheKey}, TTL = ${ttl}`)
    cache.put(cacheKey, value, ttl, timeoutCb)
  }
}
