import { IGptPreset } from '../../types/IGptPreset'

/**
 * This function prepares the system message.
 * @param settings - The settings object.
 * @returns - The system message.
 */
export function appendSystemMessage(settings: IGptPreset) {
  const systemMessage = settings.systemMessage.slice()
  if (settings.markdownOutput) {
    systemMessage.push('')
    systemMessage.push(
      'Your response should be a well formatted markdown document. If you are responding with a lot of data, please set it up nicely in markdown tables.'
    )
  }
  return systemMessage
}
