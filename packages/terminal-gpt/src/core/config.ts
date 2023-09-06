import { Config, parseBoolean, parseString, validateBoolean, validateString } from '@bemoje/commander-config'
import { presetsConfig } from './presets/presetConfig'

export const config = new Config('bemoje', 'terminal-gpt', {
  apiKey: {
    description: 'Either your api key or a path to a text file containing (only) your api key.',
    default: 'sk-',
    parse: parseString,
    validate: validateString,
  },
  tokenDetails: {
    description: 'Display detailed information about token counts for requests and responses from the OpenAI API.',
    default: false,
    parse: parseBoolean,
    validate: validateBoolean,
  },
  ...presetsConfig,
})
