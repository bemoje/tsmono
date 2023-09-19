import { Config, parseString, validateDirpath, validateString } from '@bemoje/commander-config'
import { Command } from 'commander'
import { openRepo } from './core/openRepo'

export const config = new Config('bemoje', 'open-repo', {
  rootdir: {
    description: 'An absolute path to the directory that contains your repositories.',
    default: '',
    parse: parseString,
    validate: validateDirpath,
  },
  IDE: {
    description:
      'The command to open your IDE. It is assumed that your IDE will open the directory passed to it as an argument.',
    default: 'code',
    parse: parseString,
    validate: validateString,
  },
})

export const program = new Command()
  .name('Open Repository')
  .description('Shortcut to opening a local repository in VS Code.')
  .version('0.0.0')
  .argument('[search]', 'A full or partial directory name of the repository to find and open.')
  .action(openRepo)

config.initialize(program)

program.parse()
