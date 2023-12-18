/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs-extra'
import path from 'path'
import { IGptPreset } from '../../types/IGptPreset'
import { userInput } from '../../util/userInput'

/**
 * This function gets the prompt data.
 * @param prompt - The prompt string.
 * @param settings - The settings object.
 * @param systemMessage - The system message array.
 * @param placeholder - The placeholder string.
 * @returns - The prompt data.
 */
export async function getUserPrompt(
  settings: IGptPreset,
  systemMessage: string[],
  placeholder: string,
  prompt?: string
) {
  const result = prompt
    ? { temperature: settings.temperature!, instruction: systemMessage.join('\n').trim(), input: prompt }
    : await userInput(settings.temperature!, systemMessage, placeholder, '.txt')

  result.input = result.input.trim()
  const fpath = path.resolve(result.input)
  if (fs.existsSync(fpath)) {
    result.input = fs.readFileSync(fpath, 'utf8')
  }

  return result
}
