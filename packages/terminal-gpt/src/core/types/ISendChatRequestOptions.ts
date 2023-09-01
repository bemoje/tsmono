import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'

export interface ISendChatRequestOptions {
  maxExpectedResponseTokens: number
  inputTokensResponseTokensScalar?: number
  model?: string
  preferGpt4?: boolean
  request: IOpenaiChatRequestOptions
  is16k?: boolean
}
