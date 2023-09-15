import { Command } from 'commander'
import { buildIndex } from './core/buildIndex/buildIndex'
import { config } from './core/config'
import { search } from './core/search/search'

export const program = new Command()
  .name('bfind')
  .description(
    [
      'Very fast file search. File contents are not indexed - only file and directory paths.',
      'Directories are highlighted in blue in search results.',
      'Search results are sorted by last modified date.',
      'Regex ignore patterns are configurable in CLI or the JSON config file.',
      'Each argument is a search term. If multiple terms are provided, ' +
        'they ALL must be present in the path to be considered a search hit.',
    ].join(' ')
  )
  .version('0.0.0')

program
  .command('search')
  .aliases(['s'])
  .summary('Search files')
  .argument(
    '[searchKeys...]',
    'Each argument is a search term. If multiple terms are provided, ' +
      'they ALL must be present in the path to be considered a search hit.'
  )
  .option('-a, --print-all', 'Print all search results.')
  .action(search)

program.command('index').aliases(['i']).summary('Rebuild the index.').action(buildIndex)

config.initialize(program)

process.on('uncaughtException', (error: unknown) => {
  if (config.userconfig.get('print-scan-errors')) {
    console.error(error['message'] ? error['message'] : error)
  }
})

program.parse()
