import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'
import { getPreviousInteraction } from './getPreviousInteraction'

/**
 * Creates a chat request for the OpenAI API.
 * @param jsondir - The directory where the JSON files are located.
 * @param isReply - A boolean value indicating whether the message is a reply.
 * @param temperature - A number representing the randomness of the AI's output. Higher values mean more randomness.
 * @param instruction - A string containing the instruction for the AI.
 * @param input - A string containing the user's input.
 * @returns An object conforming to the IOpenaiChatRequestOptions interface, containing the messages, temperature, and retry options.
 */
export function createChatRequest(
  jsondir: string,
  isReply: boolean,
  temperature: number,
  instruction: string,
  input: string,
) {
  const prevInteraction = getPreviousInteraction(jsondir)
  const prevMessages =
    isReply && prevInteraction
      ? (prevInteraction.data.messages as [])
      : [
          {
            role: 'system',
            content: instruction,
          },
        ]
  const messages = [
    ...prevMessages,
    {
      role: 'user',
      content: input,
    },
  ]

  return {
    messages,
    temperature,
    retry: { retries: 1 },
  } as IOpenaiChatRequestOptions
}
