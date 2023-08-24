import type { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'

export interface IGptInteraction {
  timestamp: number
  data: IOpenaiChatRequestOptions
}
