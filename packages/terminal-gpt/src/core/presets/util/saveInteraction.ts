import { IOpenaiChatRequestOptions } from '@bemoje/openai-api-client'
import { prettyIsoDateString } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { IGptInteraction } from '../../types/IGptInteraction'
import { interactionAsMarkdown } from './interactionAsMarkdown'

/**
 * This function saves the interaction.
 * @param jsondir - The json directory.
 * @param textdir - The text directory.
 * @param settings - The settings object.
 * @param temperature - The temperature number.
 * @param instruction - The instruction string.
 * @param input - The input string.
 * @param response - The response string.
 * @returns - The interaction.
 */
export function saveInteraction(
  jsondir: string,
  textdir: string,
  isMarkdown: boolean,
  data: IOpenaiChatRequestOptions
): string {
  const timestamp = Date.now()
  const prettyTimestamp = prettyIsoDateString(new Date(timestamp).toISOString())
  const jsonPath = path.join(jsondir, prettyTimestamp + '.json')
  const textPath = path.join(textdir, prettyTimestamp + (isMarkdown ? '.md' : '.txt'))

  const interaction: IGptInteraction = { timestamp, data }
  fs.writeFileSync(jsonPath, JSON.stringify(interaction), 'utf8')

  const response = isMarkdown ? interactionAsMarkdown(interaction) : interaction.data.messages?.pop()?.content || ''
  fs.writeFileSync(textPath, response, 'utf8')

  return textPath
}
