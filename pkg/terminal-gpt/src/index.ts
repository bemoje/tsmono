import { Command } from 'commander'
import { config } from './core/config'
import { emails } from './core/emails/emails'

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
