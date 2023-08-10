import { getUserInputFromEditor } from '@bemoje/commander-config'
import { strWrapIn } from '@bemoje/node-util'
import { config } from '../index'

export async function userInput(
  defaultTemperature: number,
  defaultSystemMessage: string[],
): Promise<{ temperature: number; instruction: string; input: string }> {
  const delim = '---------------------------'
  const sdelim = strWrapIn(delim, '\n\r\n')
  const userInput = await getUserInputFromEditor({
    appdataDirectory: config.appdataDirectory,
    editor: config.settings.editor,
    currentContent: defaultSystemMessage.join('\n') + sdelim + 'Temperature: ' + defaultTemperature + sdelim,
  })
  const [instruction, temp, input] = userInput.split(delim).map((s) => s.trim())
  if (!input.trim()) {
    console.log('No input provided. Exiting...')
    process.exit(0)
  }
  const temperature = Number(temp.replace('Temperature: ', '').trim())
  return { temperature, instruction, input }
}
