import { IResponseCacheOptions } from '@bemoje/api-util'
import type { Options as IAsyncRetryOptions } from 'async-retry'
import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai'

export interface IOpenaiChatRequestOptions extends Omit<CreateChatCompletionRequest, 'model' | 'messages'> {
  /**
   * The model to use if not the defeault one.
   */
  model?: string

  /**
   * Message history
   */
  messages?: ChatCompletionRequestMessage[]

  /**
   * A user message inserted before all other messages, except the system instructions message if provided
   */
  prompt?: string

  /**
   * System instructions message inserted before all user and assistant messages
   */
  instruction?: string

  /**
   * API request retry options
   */
  retry?: IAsyncRetryOptions

  /**
   * Cache options
   */
  cache?: IResponseCacheOptions
}
