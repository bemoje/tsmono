import { getUserInputFromEditorSync, parseInteger, parseNumber, parseString } from '@bemoje/commander-config'

const tsDefaultSystemMessage = [
  'You are are senior developer in a company that makes node-js web services.',
  'I am a recently employed junior developer and you are helping me with my issues.',
  '',
  'I am working in node-js.',
  'I am working in an NX mono-repo.',
  'I am working in TypeScript.',
  'I am working in Visual Studio Code.',
  'I am using git and Github.',
  '',
  'Your response should be a markdown document. Any commands or code should be wrapped in code blocks.',
]

export const tsConfig = {
  ts_openResponseIn: {
    description:
      'Which program to open the returned response in. Defaults to chrome. If your browser cannot render markdown, you can install an extension.',
    default: 'chrome',
    required: true,
    parse: parseString,
  },
  ts_defaultTemperature: {
    description:
      'The default temperature to use with the gpt model. This settings can also be modified for each request.',
    default: 0.2,
    required: true,
    parse: parseNumber,
  },
  ts_systemMessage: {
    description:
      'The default instructions / system message to use with the gpt model. This settings can also be modified for each request.',
    default: tsDefaultSystemMessage,
    required: true,
    parse: (json: string): string[] => {
      const config = JSON.parse(json)
      return getUserInputFromEditorSync({
        appdataDirectory: config.appdataDirectory,
        editor: config.settings.editor,
        currentContent: tsDefaultSystemMessage.join('\n'),
        extension: '.txt',
      }).split('\n')
    },
  },
  ts_maxExpectedReponseTokens: {
    description:
      'The number of tokens you expect the chat-gpt response to be. If the response is longer than this, it will be truncated by openai.',
    default: 2500,
    required: true,
    parse: parseInteger,
  },
  ts_lastInput: {
    description: 'The latest user input.',
    default: '',
    required: false,
    parse: parseString,
  },
}
