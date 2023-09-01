import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'
import { IGptPreset } from './IGptPreset'

export interface ISendChatRequestOptions {
  settings: IGptPreset
  request: IOpenaiChatRequestOptions
  is16k?: boolean
}
