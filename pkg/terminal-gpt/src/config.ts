import { Config, parseBoolean, parseString } from '@bemoje/commander-config'
import { emailsConfig } from './core/emails/emailsConfig'

export const config = new Config('bemoje', 'terminal-gpt', {
  api_key: {
    description: 'Either your api key or a path to a text file containing (only) your api key.',
    default: '',
    required: true,
    parse: parseString,
  },
  prefer_gpt4: {
    description:
      'Whether to use GPT-4 whenever possible. If your openai account does not have access to GPT-4, set this to false.',
    default: true,
    required: false,
    parse: parseBoolean,
  },
  ...emailsConfig,
})
