import { Config, parseBoolean, parseString, validateBoolean, validateString } from '@bemoje/commander-config'
import { emailsConfig } from './emails/emailsConfig'
import { presetsConfig } from './presets/presetConfig'

export const config = new Config('bemoje', 'terminal-gpt', {
  apiKey: {
    description: 'Either your api key or a path to a text file containing (only) your api key.',
    default: 'sk-',
    parse: parseString,
    validate: validateString,
  },
  preferGpt4: {
    description:
      'Whether to use GPT-4 whenever possible. If your openai account does not have access to GPT-4, set this to false. Please note that the response time is much much higher for GPT-4.',
    default: false,
    parse: parseBoolean,
    validate: validateBoolean,
  },
  ...presetsConfig,
  ...emailsConfig,
})
