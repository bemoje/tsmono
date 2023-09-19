import { createCommand } from '@bemoje/commander-config'
import { Command } from 'commander'
import { allHelp } from '../actions/allHelp'
import { commands } from './commands'
import { config } from './config'

export function main() {
  const program = new Command()
    .name('rman')
    .description('Description: Tools for management of an NX mono-repo.\n')
    .version('0.0.0')

  for (const command of commands) {
    createCommand(program, command)
  }

  createCommand(program, {
    command: 'all-help',
    summary: 'Print help for every command.',
    usage: [{ command: 'rman all-help' }],
    action: () => {
      allHelp(program)
    },
  })

  config.initialize(program)

  program.configureHelp({
    subcommandTerm: (cmd) => `${cmd.alias() ? cmd.alias().padEnd(3, ' ') + '|' : ''}${cmd.name()}`,
  })

  process.chdir(config.userconfig.get('repoRootDirectory'))

  program.parse()
}
