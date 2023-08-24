import { ApiReponseCache } from './ApiReponseCache'

describe(ApiReponseCache.name, () => {
  console.log = jest.fn()
  console.error = jest.fn()
  console.warn = jest.fn()
  console.dir = jest.fn()

  const cache = new ApiReponseCache<any>({ name: 'testing', maxAgeMs: 1000 })

  describe('constructor', () => {
    it('should create a new instance with default options', () => {
      expect(cache).toBeDefined()
      expect(cache.db).toBeDefined()
      expect(cache.maxAgeMs).toBe(1000)
    })

    it('should create a new instance with custom options', async () => {
      const options = {
        name: 'test',
        maxAgeMs: 60000,
      }
      const cache = new ApiReponseCache<any>(options)
      expect(cache).toBeDefined()
      expect(cache.db).toBeDefined()
      expect(cache.maxAgeMs).toBe(60000)
    })
  })

  describe('hashKey', () => {
    it('should return the hash of the key', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      expect(hash).toBeDefined()
      expect(typeof hash).toBe('string')
    })
  })

  describe('getOrElse', () => {
    it('should return the value if it exists in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await cache.put(hash, 'value')
      const value = await cache.getOrElse(hash, () => 'new value')
      expect(value).toBe('value')
    })

    it('should retrieve a new value if it does not exist in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      const value = await cache.getOrElse(hash, () => 'new value')
      expect(value).toBe('new value')
    })
  })

  describe('get', () => {
    it('should return the value if it exists in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await cache.put(hash, 'value')
      const value = await cache.get(hash)
      expect(value).toBe('value')
    })

    it('should throw an error if the value does not exist in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await expect(async () => cache.get(hash)).rejects.toThrow()
    })
  })

  describe('getSafe', () => {
    it('should return the value if it exists in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await cache.put(hash, 'value')
      const value = await cache.getSafe(hash)
      expect(value).toBe('value')
    })

    it('should return undefined if the value does not exist in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      const value = await cache.getSafe(hash)
      expect(value).toBeUndefined()
    })
  })

  describe('has', () => {
    it('should return true if the value exists in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await cache.put(hash, 'value')
      const exists = await cache.has(hash)
      expect(exists).toBe(true)
    })

    it('should return false if the value does not exist in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      const exists = await cache.has(hash)
      expect(exists).toBe(false)
    })
  })

  describe('put', () => {
    it('should store the value in the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      const value = await cache.put(hash, 'value')
      expect(value).toBe('value')
      const exists = await cache.has(hash)
      expect(exists).toBe(true)
    })
  })

  describe('delete', () => {
    it('should delete the value from the cache', async () => {
      await cache.deleteEverything()
      const hash = cache.hashKey('test')
      await cache.put(hash, 'value')
      await cache.delete(hash)
      const exists = await cache.has(hash)
      expect(exists).toBe(false)
    })
  })

  describe('deleteExpired', () => {
    it('should delete all expired data from the cache', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await cache.deleteExpired()
      const exists1 = await cache.has(hash1)
      const exists2 = await cache.has(hash2)
      expect(exists1).toBe(false)
      expect(exists2).toBe(false)
    })
  })

  describe('deleteEverything', () => {
    it('should delete all cached API responses', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      await cache.deleteEverything()
      const exists1 = await cache.has(hash1)
      const exists2 = await cache.has(hash2)
      expect(exists1).toBe(false)
      expect(exists2).toBe(false)
    })
  })

  describe('entries', () => {
    it('should iterate over all [key, value] pairs in the cache', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      const entries: [string, any][] = []
      for await (const entry of cache.entries()) {
        entries.push(entry)
      }
      expect(entries.length).toBe(2)
      expect(entries[1][0]).toBe(hash1)
      expect(entries[1][1]).toBe('value1')
      expect(entries[0][0]).toBe(hash2)
      expect(entries[0][1]).toBe('value2')
    })
  })

  describe('keys', () => {
    it('should iterate over all keys in the cache', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      const keys: string[] = []
      for await (const key of cache.keys()) {
        keys.push(key)
      }
      expect(keys.length).toBe(2)
      expect(keys[1]).toBe(hash1)
      expect(keys[0]).toBe(hash2)
    })
  })

  describe('values', () => {
    it('should iterate over all values in the cache', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      const values: any[] = []
      for await (const value of cache.values()) {
        values.push(value)
      }
      expect(values.length).toBe(2)
      expect(values[1]).toBe('value1')
      expect(values[0]).toBe('value2')
    })
  })

  describe('size', () => {
    it('should return the number of entries in the cache', async () => {
      await cache.deleteEverything()
      const hash1 = cache.hashKey('test1')
      const hash2 = cache.hashKey('test2')
      await cache.put(hash1, 'value1')
      await cache.put(hash2, 'value2')
      const size = await cache.size()
      expect(size).toBe(2)
    })
  })
})
