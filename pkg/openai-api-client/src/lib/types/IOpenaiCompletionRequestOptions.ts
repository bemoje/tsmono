import { IResponseCacheOptions } from '@bemoje/api-util'
import type { Options as IAsyncRetryOptions } from 'async-retry'
import type { CreateCompletionRequest } from 'openai'

export interface IOpenaiCompletionRequestOptions extends Omit<CreateCompletionRequest, 'model'> {
  /**
   * The model to use if not the defeault one.
   */
  model?: string

  /**
   * Alternative to max_tokens. The maximum number of tokens to generate. Requests can use either max_tokens or response_max_tokens.
   */
  response_max_tokens?: number

  /**
   * API request retry options
   */
  retry?: IAsyncRetryOptions

  /**
   * Instructions message prepended to the prompt
   */
  instruction?: string

  /**
   * Cache options
   */
  cache?: IResponseCacheOptions
}
