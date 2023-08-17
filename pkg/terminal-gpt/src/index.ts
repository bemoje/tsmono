import { Command } from 'commander'
import { config } from './core/config'
import { emails } from './core/emails/emails'
import { ts } from './core/ts/ts'

export const program = new Command()
  .name('TerminalGPT')
  .description('ChatGPT tools right in the terminal')
  .version('0.0.16')

config.initialize(program)

program
  .command('emails')
  .description('Parse email thread.')
  .action(async () => {
    config.assertNoMissingRequired()
    await emails()
  })

program
  .command('ts')
  .description('Get help with typescript. Edit the config so the system message describes your setup.')
  .argument('[prompt...]', 'Optionally, provide a prompt. If omitted, a text editor is opened.', '')
  .action(async (prompt: string[]) => {
    config.assertNoMissingRequired()
    await ts(typeof prompt === 'string' ? prompt : prompt.join(' '))
  })

program.parse()
