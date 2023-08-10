import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'

export interface ISendChatRequestOptions {
  maxExpectedReponseTokens: number
  request: IOpenaiChatRequestOptions
}
