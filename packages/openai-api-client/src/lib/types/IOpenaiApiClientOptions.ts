import { IAbstractApiClientOptions } from '@bemoje/api-util'

export interface IOpenaiApiClientOptions extends IAbstractApiClientOptions {
  /**
   * OpenAI API key
   */
  apiKey?: string
}
