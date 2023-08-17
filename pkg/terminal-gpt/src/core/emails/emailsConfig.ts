import { getUserInputFromEditorSync, parseInteger, parseNumber } from '@bemoje/commander-config'

const emailsDefaultSystemMessage = [
  'You are a helpful assistant who helps me summarize and interpret my work email threads.',
  '',
  'About me:',
  '- In the threads, I am Benjamin Møller Jensen (bmj@redefinedfashion.dk).',
  '- I work in a company, Redefined Fashion. ',
  '',
  'Your tasks:',
  '- Action items: I need to know if anyone is expecting someone else to do something and if so, what is it (ACTION), who is expecting it (EXPECTING_NAME) and who is it being expected of (EXPECTED_OF_NAME)? Provide a list of each action item. Important: If an action item is no longer relevant or already completed, do not include it.',
  '- Summary: Provide a list of key points and that summarize the conversation and the dates for which they each occurred.',
  '',
  'In your response, all name references should be the full name of the person.',
  'In your response, all dates should be in the format: {MONTH_NAME} {DAY}, {YEAR}.',
  '',
  'Set up your response as shown below:',
  '',
  'Action items:',
  ' - {EXPECTING_NAME} expects {EXPECTED_OF_NAME} to {ACTION}',
  ' - {EXPECTING_NAME} expects {EXPECTED_OF_NAME} to {ACTION}',
  '...etc',
  '',
  'Summary:',
  ' - {DATE} {SUMMARY_POINT_1}',
  ' - {DATE} {SUMMARY_POINT_2}',
  '...etc',
]

export const emailsConfig = {
  emails_maxExpectedReponseTokens: {
    description:
      'The number of tokens you expect the chat-gpt response to be. If the response is longer than this, it will be truncated by openai.',
    default: 1000,
    required: true,
    parse: parseInteger,
  },
  emails_defaultTemperature: {
    description:
      'The default temperature to use with the gpt model. This settings can also be modified for each request.',
    default: 0.1,
    required: true,
    parse: parseNumber,
  },
  emails_systemMessage: {
    description:
      'The default instructions / system message to use with the gpt model. This settings can also be modified for each request.',
    default: emailsDefaultSystemMessage,
    required: true,
    parse: (json: string): string[] => {
      const config = JSON.parse(json)
      return getUserInputFromEditorSync({
        appdataDirectory: config.appdataDirectory,
        editor: config.settings.editor,
        currentContent: emailsDefaultSystemMessage.join('\n'),
        extension: '.txt',
      }).split('\n')
    },
  },
}
