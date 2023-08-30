import { Config, parseString, validateString } from '@bemoje/commander-config'
import { emailsConfig } from './emails/emailsConfig'
import { presetsConfig } from './presets/presetConfig'

export const config = new Config('bemoje', 'terminal-gpt', {
  apiKey: {
    description: 'Either your api key or a path to a text file containing (only) your api key.',
    default: 'sk-',
    parse: parseString,
    validate: validateString,
  },
  ...presetsConfig,
  ...emailsConfig,
})
