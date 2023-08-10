import { IPromiseQueueOptions, IQueue, IQueueAddOptions } from '@bemoje/queue'
import type { Options as IAsyncRetryOptions } from 'async-retry'
import { IApiResponseCacheOptions } from './IApiResponseCacheOptions'
import { IResponseCacheOptions } from './IResponseCacheOptions'

/**
 * Options for creating a new instance of AbstractApiClient.
 * @see AbstractApiClient
 */
export interface IAbstractApiClientOptions {
  /**
   * Options for initialization the cache
   */
  cache?: IApiResponseCacheOptions

  /**
   * Global options for concurrency control. These affect all API requests.
   */
  concurrency?: IPromiseQueueOptions<IQueue<() => Promise<unknown>, IQueueAddOptions>, IQueueAddOptions>

  /**
   * Defaults for API request retry behaviour. Can be overriden in individual method calls.
   */
  retryDefaults?: IAsyncRetryOptions

  /**
   * Defaults for API request cache behaviour. Can be overriden in individual method calls.
   */
  cacheDefaults?: IResponseCacheOptions
}
