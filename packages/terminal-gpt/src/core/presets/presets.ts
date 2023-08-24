/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { strWrapIn } from '@bemoje/string'
import { execSync } from 'child_process'
import { cyan, green } from 'cli-color'
import { config } from '../config'
import { sendChatRequest } from '../sendChatRequest'
import type { IGptPreset } from '../types/IGptPreset'
import { appendSystemMessage } from './util/appendSystemMessage'
import { createChatRequest } from './util/createChatRequest'
import { createDirectories } from './util/createDirectories'
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
  // general settings/defaults for all presets
  const consoleOutput = config.appdata.user.get('presets_terminalOutput')
  // settings for the specific preset
  const settings: IGptPreset = config.appdata.user.get('presets')[preset]
  if (!settings.temperature) settings.temperature = config.appdata.user.get('presets_temperature')
  if (!settings.markdownOutput) settings.markdownOutput = config.appdata.user.get('presets_markdownOutput')
  if (!settings.terminalOutput) settings.terminalOutput = config.appdata.user.get('presets_terminalOutput')
  if (!settings.openResponseIn) settings.openResponseIn = config.appdata.user.get('presets_openResponseIn')
  if (!settings.maxExpectedResponseTokens)
    settings.maxExpectedResponseTokens = config.appdata.user.get('presets_maxExpectedResponseTokens')
  if (!settings.improveResponse) settings.improveResponse = config.appdata.user.get('presets_improveResponse')

  // const { markdownOutput, openResponseIn, maxExpectedResponseTokens } = settings
  const { jsondir, textdir } = createDirectories(preset)
  // get user input
  const systemMessage = appendSystemMessage(settings)
  const promptPlaceholder = getPromptPlaceholder(jsondir, isEdit)
  const userInput = await getUserPrompt(settings, systemMessage, promptPlaceholder, prompt)
  const { temperature, instruction, input } = userInput
  if (consoleOutput) console.log(green(strWrapIn(input, '\n')))
  // send request
  const request = createChatRequest(jsondir, isReply, temperature, instruction, input)
  const response = await sendChatRequest({
    maxExpectedResponseTokens: settings.maxExpectedResponseTokens!,
    request,
    is16k,
  })
  request.messages?.push({ role: 'assistant', content: response })
  if (consoleOutput) console.log(cyan(strWrapIn(response, '\n')))
  // save data
  const textPath = saveInteraction(jsondir, textdir, settings.markdownOutput!, request)
  // user output
  if (settings.openResponseIn) execSync(`start ${settings.openResponseIn} "${textPath}"`, { stdio: 'inherit' })
}
