import { Command } from 'commander'
import { openRepo } from '../lib/openRepo'
import { config } from './config'

export function main() {
  const program = new Command()
    .name('Open Repository')
    .description('Shortcut to opening a local repository in VS Code.')
    .version('0.0.0')
    .argument('[search]', 'A full or partial directory name of the repository to find and open.')
    .action(openRepo)

  config.initialize(program)

  program.parse()
}
