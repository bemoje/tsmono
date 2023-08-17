import { funAsyncRateLimit } from '@bemoje/function'
import type { IQueue, IQueueAddOptions } from '@bemoje/queue'
import { IPromiseQueueOptions, PromiseQueue } from '@bemoje/queue'
import asyncRetry from 'async-retry'
import EventEmitter from 'events'
import { cloneDeep } from 'lodash'
import { ApiReponseCache } from './ApiReponseCache'
import { IAbstractApiClientOptions } from './types/IAbstractApiClientOptions'
import type { IApiResponseCacheOptions } from './types/IApiResponseCacheOptions'
import { IAsyncRetryOptions } from './types/IAsyncRetryOptions'
import type { IResponseCacheOptions } from './types/IResponseCacheOptions'

/**
 * A class representing some kind of client retrieving resources over the internet, like an API or SQL server.
 * @remarks
 * In order to use this class, it must be extended first and then use the sendRequest method.
 */
export abstract class AbstractApiClient {
  /**
   * Event emitter for cache events
   */
  readonly events = new EventEmitter()

  /**
   * All emitted event names. Please note that the cache also emits events.
   */
  get eventNames() {
    return ['retry', 'error', 'response', 'ready', 'options']
  }

  /**
   * API response cache
   */
  readonly cache?: ApiReponseCache<any>

  /**
   * Global queue for sending requests to the openai api.
   */
  readonly queue: PromiseQueue<IQueue<() => Promise<unknown>, IQueueAddOptions>, IQueueAddOptions>

  /**
   * Default options for async retry for api requests.
   * Can be overriden in individual method calls.
   */
  readonly retryDefaults: IAsyncRetryOptions = {
    minTimeout: 1000,
    retries: 5,
    factor: 2.5,
    randomize: true,
  }

  /**
   * Default options for caching for api requests.
   * Can be overriden in individual method calls.
   */
  readonly cacheDefaults: IResponseCacheOptions = {
    overwrite: false,
  }

  /**
   * Options for concurrency control. These affect all API requests.
   */
  static readonly concurrencyDefaults: IPromiseQueueOptions<
    IQueue<() => Promise<unknown>, IQueueAddOptions>,
    IQueueAddOptions
  > = {
    // max requests
    // intervalCap: 10000,
    // per minute
    // interval: 1000 * 60,
    // Whether the task must finish in the given interval or will be carried over into the next interval count.
    // carryoverConcurrencyCount: false,
    // concurrent requests
    concurrency: 100,
    // whether to start immediately when pushed to queue
    autoStart: true,
  }

  /**
   * Generic function for sending requests to the openai api.
   * This is used for all the API endpoints.
   * It handles retrying, cache, hashing, and emitting events.
   * This method is bound to the instance on initialization because it gets wrapped with a concurrency controller in the constructor.
   * @param apiRequest - The function that makes an API request and returns the response.
   * @param args - The request options that make this request unique. When using the cache, this is what is hashed to get a cache key.
   * @param retry - The retry options.
   * @param cache - The cache options.
   */
  protected readonly sendRequest: <T>(options: {
    apiRequest: () => Promise<T>
    args: any[]
    retry?: IAsyncRetryOptions
    cache?: IResponseCacheOptions
  }) => Promise<T>

  /**
   * Create a new OpenaiApiClient instance.
   * @param options - The constructor options to use.
   */
  constructor(options: IAbstractApiClientOptions = {}) {
    // handle options
    options = this.handleOptions(options)

    // init cache instance if enabled
    if (options?.cache?.enable) {
      this.cache = new ApiReponseCache<any>(options.cache as IApiResponseCacheOptions)
    }

    // function that wraps all api rqeuests and provides retry functionality, caching, concurrency control, etc.
    const _sendRequest = async <T>(options: {
      apiRequest: () => Promise<T>
      args: any[]
      retry?: IAsyncRetryOptions
      cache?: IResponseCacheOptions
    }): Promise<T> => {
      // options
      const { apiRequest, args, retry, cache } = options
      const _retry = this.handleRetryOptions(retry)
      const _cache = this.handleCacheOptions(cache)
      // get data from cache if exists, otherwise make api request
      const getFromCacheOrApi = async (bail: (e: Error) => void, attempt: number) => {
        try {
          if (!this.cache) return await apiRequest()
          const hash = this.cache.hashKey({ args, task: apiRequest.toString() })
          if (_cache?.overwrite) await this.cache.delete(hash)
          return await this.cache.getOrElse(hash, apiRequest)
        } catch (error) {
          const data = { attempt, error, args }
          if (attempt > 1) this.emit('retry', data)
          else this.emit('error', data)
          // bail(error as Error)
        }
      }
      // handle api request retries
      const response = await asyncRetry(getFromCacheOrApi, _retry)
      this.emit('response', { response, args })
      return response
    }
    // add concurrency control
    const [queue, sendRequest] = funAsyncRateLimit(_sendRequest.bind(this), options.concurrency)
    this.queue = queue
    this.sendRequest = sendRequest
    this.emit('ready', 'ready')
  }

  /**
   * Handle the options passed to the constructor.
   * @param options - The options to handle.
   */
  protected handleOptions(options: IAbstractApiClientOptions): IAbstractApiClientOptions {
    options = cloneDeep(options)
    const Constructor = Object.getPrototypeOf(this).constructor
    if (!options.cache) options.cache = {}
    if (!options.cache.name) options.cache.name = Constructor.name
    options.concurrency = Object.assign({}, Constructor.concurrencyDefaults, options.concurrency)
    Object.assign(this.retryDefaults, options.retryDefaults)
    Object.assign(this.cacheDefaults, options.cacheDefaults)
    this.emit('options', options)
    return options
  }

  /**
   * Handle retry options.
   * @param retryOptions - The retry options to handle.
   */
  protected handleRetryOptions(retryOptions?: IAsyncRetryOptions): IAsyncRetryOptions {
    return retryOptions ? Object.assign({}, this.retryDefaults, retryOptions) : this.retryDefaults
  }

  /**
   * Handle cache options.
   * @param cacheOptions - The cache options to handle.
   */
  protected handleCacheOptions(cacheOptions?: IResponseCacheOptions): IResponseCacheOptions {
    return cacheOptions ? Object.assign({}, this.cacheDefaults, cacheOptions) : this.cacheDefaults
  }

  /**
   * Emit an event but adds 'this' as an extra trailing argument.
   * @param event - The event name.
   * @param arg - The argument to emit.
   */
  protected emit<T>(event: string, arg: T): T {
    this.events.emit(event, arg, this)
    return arg
  }
}
