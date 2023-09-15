import { getUserInputFromEditor } from '@bemoje/commander-config'
import { strWrapIn } from '@bemoje/util'
import { config } from './config'

/**
 * This function is used to get user input from the editor.
 * It takes in temperature, default system message, previous input and extension as parameters.
 * It returns a promise that resolves to an object containing temperature, instruction and input.
 *
 * @param temperature - The current temperature value.
 * @param defaultSystemMessage - The default system message to be displayed in the editor.
 * @param previousInput - The previous input provided by the user. Default value is an empty string.
 * @param extension - The file extension for the editor. Default value is '.txt'.
 *
 * @returns A promise that resolves to an object containing temperature, instruction and input.
 */
export async function userInput(
  temperature: number,
  defaultSystemMessage: string[],
  previousInput = '',
  extension = '.txt'
): Promise<{ temperature: number; instruction: string; input: string }> {
  const delim = '---------------------------'
  const sdelim = strWrapIn(delim, '\n\r\n')
  const userInput = await getUserInputFromEditor({
    appdataDirectory: config.data.directory,
    editor: config.userconfig.get('editor'),
    currentContent: defaultSystemMessage.join('\n') + sdelim + 'Temperature: ' + temperature + sdelim + previousInput,
    extension,
  })
  const [instruction, temp, input] = userInput.split(delim).map((s) => s.trim())
  if (!input.trim()) {
    config.userconfig.set('ts_lastInput', '')
    console.log('No input provided. Exiting...')
    process.exit(0)
  }

  return { temperature: Number(temp.replace('Temperature: ', '').trim()), instruction, input }
}
