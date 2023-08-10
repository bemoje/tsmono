import { IAsyncRetryOptions, IResponseCacheOptions } from '@bemoje/api-util'
import { IOpenaiTranscribeRequest } from './IOpenaiTranscribeRequest'

export interface IOpenaiTranscribeOptions {
  /**
   * Transcription request object
   */
  request?: IOpenaiTranscribeRequest

  /**
   * API request retry options
   */
  retry?: IAsyncRetryOptions

  /**
   * Cache options
   */
  cache?: IResponseCacheOptions
}
