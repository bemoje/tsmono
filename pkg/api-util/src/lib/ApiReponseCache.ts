import getAppDataPath from 'appdata-path'
import EventEmitter from 'events'
import { Level } from 'level'
import { mkdirpSync } from 'mkdirp'
import hash from 'object-hash'
import path from 'path'
import { IApiResponseCacheOptions } from './types/IApiResponseCacheOptions'

/**
 * Persistent API response cache based on level-db.
 */
export class ApiReponseCache<V> {
  /**
   * Level database instance
   */
  readonly db: Level<string, string>

  /**
   * Event emitter for cache events
   */
  readonly events: EventEmitter = new EventEmitter()

  /**
   * All emitted event names.
   */
  get eventNames() {
    return ['options', 'hit', 'miss', 'get', 'put', 'delete', 'error', 'expired']
  }

  /**
   * Max age of cached data in milliseconds. Defaults to 0 (no max age).
   */
  readonly maxAgeMs: number

  /**
   * Default options for creating new instances
   */
  static readonly optionsDefaults = {
    name: 'default',
    dirpath: getAppDataPath('ApiReponseCache'),
    maxAgeMs: 0,
  }

  /**
   * Create a new instance.
   * @param options - Options for creating a new instance.
   * @emits options - the options used to create the instance.
   */
  constructor(options: IApiResponseCacheOptions) {
    const _options = Object.assign({}, ApiReponseCache.optionsDefaults, options)
    const { name, dirpath, maxAgeMs } = _options
    this.emit('options', _options)
    this.maxAgeMs = maxAgeMs
    const dbpath = path.join(dirpath, name)
    mkdirpSync(dbpath)
    this.db = new Level(dbpath)
    Object.defineProperty(this, 'db', { enumerable: false })
  }

  /**
   * Hash any type of key to a base64 string, using the SHA1 algorithm.
   * @param key - The key to hash.
   */
  hashKey(key: any): string {
    return hash(key === undefined ? 'undefined' : key, { algorithm: 'sha1', encoding: 'base64' })
  }

  /**
   * Get a value for a given hash key if it exists.
   * If the does not exist, returns a value from the api by invoking the provided function and then stores that value in the cache.
   * @param hash - The hash key.
   * @param apiRequest - function that returns a new value for a given key if it doesn't exist in the cache.
   * @emits hit - if the value exists in the cache.
   * @emits miss - if the value does not exist in the cache.
   */
  async getOrElse(hash: string, apiRequest: () => V | Promise<V>): Promise<V> {
    try {
      const value = await this.get(hash)
      this.emit('hit', hash)
      return value
    } catch (e) {
      this.emit('miss', hash)
      const value = await apiRequest()
      return await this.put(hash, value)
    }
  }

  /**
   * Get a value for a given hash key.
   * @param hash - The hash key.
   * @emits error - if the value does not exist for the give hash.
   * @emits get - if the value exists for the given hash.
   */
  async get(hash: string): Promise<V> {
    return await this.orThrow(async () => {
      const serialized = await this.db.get(hash)
      await this.ensureNotExpired(hash, serialized)
      this.emit('get', hash)
      return this.parseSerializedValue(serialized)
    })
  }

  /**
   * Get a value for a given hash key or undefined if it does not exist or an error occurs.
   * @param hash - The hash key.
   * @emits get - if the value exists for the given hash.
   */
  async getSafe(hash: string): Promise<V | undefined> {
    try {
      const serialized = await this.db.get(hash)
      await this.ensureNotExpired(hash, serialized)
      this.emit('get', hash)
      return this.parseSerializedValue(serialized)
    } catch (error) {
      return undefined
    }
  }

  /**
   * Returns whether a value exists for a given key.
   * @param hash - The hash key.
   */
  async has(hash: string): Promise<boolean> {
    try {
      await this.db.get(hash)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Set a given value for a given hash key.
   * @param hash - The hash key.
   * @param value - The value to store.
   * @emits put - if insertion succeeds.
   * @emits error - if insertion fails.
   */
  async put(hash: string, value: V): Promise<V> {
    return await this.orThrow(async () => {
      const serialized = this.serializeValue(value)
      await this.db.put(hash, serialized)
      this.emit('put', hash)
      return value
    })
  }

  /**
   * Delete a given value for a given hash key if it exists.
   * @remarks No error is thrown if no value exists for the given hash.
   * @param hash - The hash key.
   * @emits error - if deletion fails.
   * @emits delete - if deletion succeeds.
   */
  async delete(hash: string): Promise<void> {
    return await this.orThrow(async () => {
      await this.db.del(hash)
      this.emit('delete', hash)
    })
  }

  /**
   * Delete all expired data.
   */
  async deleteExpired(): Promise<this> {
    for await (const _ of this.entries()) {
      // do nothing. Iterating over all entries deletes expired entries automatically.
    }
    return this
  }

  /**
   * Delete all cached API responses.
   * @emits delete - if deletion succeeds.
   */
  async deleteEverything(): Promise<void> {
    return await this.orThrow(async () => {
      await this.db.clear()
      this.emit('delete', 'All cache data was deleted.')
    })
  }

  /**
   * Iterate over all [key, value] pairs in the cache.
   * @remarks This data entries are expired, they are deleted and not yielded.
   * @emits error - if iteration encounters an error.
   */
  async *entries(): AsyncIterableIterator<[string, V]> {
    try {
      for await (const [hash, serialized] of this.db.iterator()) {
        if (this.isExpired(serialized)) {
          this.db.del(hash).then(() => this.emit('expired', hash))
        }
        yield [hash, this.parseSerializedValue(serialized)]
      }
    } catch (error) {
      throw this.emit('error', error)
    }
  }

  /**
   * Iterate over all keys in the cache.
   * @emits error - if iteration encounters an error.
   */
  async *keys(): AsyncIterableIterator<string> {
    try {
      for await (const [hash] of this.entries()) {
        yield hash
      }
    } catch (error) {
      throw this.emit('error', error)
    }
  }

  /**
   * Iterate over all values in the cache.
   * @emits error - if iteration encounters an error.
   */
  async *values(): AsyncIterableIterator<V> {
    try {
      for await (const [_, value] of this.entries()) {
        yield value
      }
    } catch (error) {
      throw this.emit('error', error)
    }
  }

  /**
   * Get the number of entries in the cache.
   */
  async size(): Promise<number> {
    let size = 0
    for await (const _ of this.entries()) {
      size++
    }
    return size
  }

  /**
   * Deletes a value from the cache if it is expired.
   * @param hash - The hash key.
   * @param serialized - The serialized value.
   * @emits expired - if the value is expired.
   */
  protected async ensureNotExpired(hash: string, serialized: string): Promise<void> {
    if (this.isExpired(serialized)) {
      await this.db.del(hash)
      this.emit('expired', hash)
      throw new Error('Expired')
    }
  }

  /**
   * Check if a still raw serialized value string is expired.
   * @param serialized - The serialized value.
   */
  protected isExpired(serialized: string): boolean {
    if (!this.maxAgeMs) return false
    return Date.now() - this.parseSerializedTimestamp(serialized) > this.maxAgeMs
  }

  /**
   * Custom JSON stringify function that prepends a timestamp to the stringified object.
   * @param value - The value to serialize.
   */
  protected serializeValue(value: V): string {
    return Date.now() + JSON.stringify(value)
  }

  /**
   * Parse the timestamp part of a raw serialized value string from the database.
   * @param serialized - The serialized value.
   */
  protected parseSerializedTimestamp(serialized: string): number {
    return parseInt(serialized.substring(0, 13))
  }

  /**
   * Parse the json part of a raw serialized value string from the database.
   * @param serialized - The serialized value.
   */
  protected parseSerializedValue(serialized: string): V {
    return JSON.parse(serialized.substring(13))
  }

  /**
   * Shorthand for try/catch block with error-handling.
   * Wrap a function call in a try catch block and emit an error event if an error occurs.
   * @param fn - The function to wrap.
   * @emits error - if the provided function throws an error.
   * @returns The return value of the provided function.
   */
  protected orThrow<T>(fn: () => T | Promise<T>): T | Promise<T> {
    try {
      return fn()
    } catch (error) {
      throw this.emit('error', error)
    }
  }

  /**
   * Emit an event but this automatically adds 'this' as an extra argument.
   * @param eventName - The event name.
   */
  protected emit<T>(eventName: string, arg: T): T {
    this.events.emit(eventName, arg, this)
    return arg
  }
}
