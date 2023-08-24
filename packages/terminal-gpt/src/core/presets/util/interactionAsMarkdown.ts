import { prettyIsoDateString } from '@bemoje/date'
import { IGptInteraction } from '../../types/IGptInteraction'

/**
 * Converts an interaction with the GPT model into a markdown string.
 * The markdown string includes the system message, timestamp, temperature and the conversation.
 * The conversation is formatted with prompts and responses.
 * @throws If there are no messages in the interaction.
 * @param interaction - The interaction object to be converted into markdown. It must be an instance of IGptInteraction.
 * @returns The interaction formatted as a markdown string.
 * @throws Will throw an error if the interaction does not contain any messages.
 */
export function interactionAsMarkdown(interaction: IGptInteraction): string {
  const timestamp = interaction.timestamp
  const data = interaction.data
  if (!data.messages) throw new Error('No messages in interaction')
  const instruction = data.messages[0].content
  const temperature = data.temperature

  let conversation = ''
  for (let i = 1; i < data.messages.length - 1; i = i + 2) {
    const prompt = data.messages[i].content
    const response = data.messages[i + 1].content
    conversation +=
      '\n\n## PROMPT\n\n' +
      '```\n' +
      prompt +
      '\n```' +
      `\n\n## RESPONSE${i >= data.messages.length - 2 ? ' <a name="res"></a>' : ''}\n\n` +
      response
  }

  return (
    '[Skip to response](#res)\n' +
    '## SYSTEM MESSAGE\n' +
    '```\n' +
    instruction +
    '\n```' +
    '\nTime: ' +
    prettyIsoDateString(new Date(timestamp).toISOString(), ' ', 'minute') +
    '\nTemperature: ' +
    temperature +
    conversation
  )
}
