import { Config, parseBoolean, parseString } from '@bemoje/commander-config'
import { Command } from 'commander'
import { emails } from './core/emails/emails'
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

export const program = new Command()
  .name('TerminalGPT')
  .description('ChatGPT tools right in the terminal')
  .version('0.0.1')

config.initialize(program)

program
  .command('emails')
  .description('Parse email thread.')
  .action(async () => {
    config.assertNoMissingRequired()
    await emails()
  })

program
  .command('test')
  .description('test')
  .action(() => console.log('test'))

program.parse()
