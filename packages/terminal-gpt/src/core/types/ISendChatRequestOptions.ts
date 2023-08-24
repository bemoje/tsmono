import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'

export interface ISendChatRequestOptions {
  maxExpectedResponseTokens: number
  request: IOpenaiChatRequestOptions
  is16k?: boolean
}
