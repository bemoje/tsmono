import { createCommand } from '@bemoje/commander-config'
import { Command } from 'commander'
import { commands } from './commands'
import { config } from './config'

export function main() {
  const program = new Command()
    .name('rman')
    .description('Description: Tools for management of an NX mono-repo.\n')
    .version('0.0.0')

  commands.forEach((options) => createCommand(program, options))
  config.initialize(program)
  process.chdir(config.userconfig.get('repoRootDirectory'))
  program.parse()
}
