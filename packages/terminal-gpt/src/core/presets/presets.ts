/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { execSync } from 'child_process'
import { cyan, green } from 'cli-color'
import { sendChatRequest } from '../sendChatRequest'
import type { IGptPreset } from '../types/IGptPreset'
import { appendSystemMessage } from './util/appendSystemMessage'
import { createChatRequest } from './util/createChatRequest'
import { createDirectories } from './util/createDirectories'
import { getPresetSettings } from './util/getPresetSettings'
import { getPromptPlaceholder } from './util/getPromptPlaceholder'
import { getUserPrompt } from './util/getUserPrompt'
import { saveInteraction } from './util/saveInteraction'

/**
 * This function handles the presets for the chat application.
 * It retrieves the settings for the specific preset, gets user input, sends the chat request, saves the interaction data, and opens the response in the specified application.
 * @param preset - The name of the preset to be used.
 * @param prompt - The prompt to be used for the chat request. If not provided, a placeholder will be used.
 * @param is16k - Whether the 16k model should be used.
 * @param isReply - Whether the last response should be used as the prompt.
 * @param isEdit - Whether the last prompt should be opened in the editor.
 */
export async function presets(preset: string, prompt?: string, is16k = false, isReply = false, isEdit = false) {
  // settings for the specific preset
  const settings: IGptPreset = getPresetSettings(preset)
  // const { markdownOutput, openResponseIn, maxExpectedResponseTokens } = settings
  const { jsondir, textdir } = createDirectories(preset)
  // get user input
  const systemMessage = appendSystemMessage(settings)
  const promptPlaceholder = getPromptPlaceholder(jsondir, isEdit)
  const userInput = await getUserPrompt(settings, systemMessage, promptPlaceholder, prompt)
  const { temperature, instruction, input } = userInput
  if (settings.terminalOutput) console.log(green('\n' + input + '\n'))
  // send request
  const request = createChatRequest(jsondir, isReply, temperature, instruction, input)
  const response = await sendChatRequest({
    maxExpectedResponseTokens: settings.maxExpectedResponseTokens,
    inputTokensResponseTokensScalar: settings.inputTokensResponseTokensScalar,
    model: settings.model,
    request,
    is16k,
  })
  request.messages?.push({ role: 'assistant', content: response })
  if (settings.terminalOutput) console.log(cyan('\n' + response + '\n'))
  // save data
  const textPath = saveInteraction(jsondir, textdir, settings.markdownOutput, request)
  // user output
  if (settings.openResponseIn !== 'none') {
    execSync(`start ${settings.openResponseIn} "${textPath}"`, { stdio: 'inherit' })
  }
}
