import { createCommand } from '@bemoje/commander-config'
import { Command } from 'commander'
import { commands } from './commands'
import { config } from './config'

export function main() {
  const program = new Command()
    .name('bfind')
    .description(
      [
        'Description: Fast (instantaneous) file search anywhere in your system.',
        'Directories are highlighted in cyan color in the search results.',
        'The search results are sorted by their last modified date.',
        'Regex ignore patterns are configurable in CLI or the JSON config file.',
        'Contents of files are not indexed/searchable - only the paths to the files.',
      ].join(' ')
    )
    .version('0.0.0')

  commands.forEach((command) => createCommand(program, command))
  config.initialize(program)
  program.parse()
}

/*
const subprocess = spawn(
  'node',
  ['--max-old-space-size=4096', 'C:/Users/bemoj/AppData/Roaming/npm/node_modules/@bemoje/bfind/bin/index.js', 'index'],
  {
    // const subprocess = spawn('bfind.cmd', ['i'], {
    detached: true,
    stdio: 'ignore',
  }
)

subprocess.unref()
*/
