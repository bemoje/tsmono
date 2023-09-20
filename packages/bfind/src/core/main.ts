import { gracefulProcessExit } from '@bemoje/commander-config'
import { Command } from 'commander'
import { buildIndex } from '../actions/buildIndex'
import { search } from '../actions/search'
import { config } from './config'

export function main() {
  const program = new Command()
    .name('bfind')
    .description(
      [
        'Very fast file search. File contents are not indexed - only file and directory paths.',
        'Directories are highlighted in blue in search results.',
        'Search results are sorted by last modified date.',
        'Regex ignore patterns are configurable in CLI or the JSON config file.',
      ].join(' ')
    )
    .version('0.0.0')

  program
    .command('search')
    .aliases(['s'])
    .summary('Search the filesystem.')
    .argument('[searchKeys...]', 'Each argument is a search term where they ALL must match.')
    .option('-p, --pipe', 'Output only filepaths, no colors or other information.')
    .option('-c, --cwd', 'Search only the current working directory.')
    .option('-d, --dir <dir>', 'Limit search to a given directory. Overrides the --cwd option.')
    .option('-e, --extensions <exts>', 'Include only files with these extensions (comma separated).')
    .action(search)

  program.command('index').aliases(['i']).summary('Rebuild the index.').action(buildIndex)

  config.initialize(program)

  process.on('uncaughtException', (error: unknown) => {
    if (config.userconfig.get('print-scan-errors')) {
      gracefulProcessExit(error['message'] ? error['message'] : error)
    }
  })

  program.parse()
}
