import { createCommand } from '@bemoje/commander-config'
import { Command } from 'commander'
import { buildIndex } from '../actions/buildIndex'
import { search } from '../actions/search'
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

  createCommand(program, {
    command: 'search',
    aliases: ['s'],
    summary: 'Search the filesystem.',
    usage: [
      {
        command: 'bfind search index.ts',
        description: "Return a list of paths to all 'index.ts' files..",
      },
      {
        command: 'bfind search src index.ts',
        description: "Search for all paths that have 'src' and 'index.ts' somewhere in them.",
      },
    ],
    arguments: [
      {
        name: 'searchTerms',
        description:
          'Each argument is a search term where all terms must match somewhere in a path to be included in the result.',
        isRest: true,
      },
    ],
    options: [
      {
        name: 'fterms',
        char: 'f',
        description: 'Search inside every file in the search result. Provide search terms (comma-delimited).',
        argument: 'fsterms',
        isCommaDelimited: true,
      },
      {
        name: 'dir',
        char: 'd',
        description: 'Limit search to a given directory. Overrides the --cwd option.',
        argument: 'dir',
      },
      {
        name: 'cwd',
        char: 'c',
        description: 'Search only the current working directory.',
      },
      {
        name: 'pipe',
        char: 'p',
        description: 'Output only filepaths, no colors or other information.',
      },
      {
        name: 'extensions',
        char: 'e',
        description: 'Include only files with provided extensions (comma-delimited).',
        argument: 'exts',
        isCommaDelimited: true,
      },
    ],
    action: search,
  })

  createCommand(program, {
    command: 'index',
    aliases: ['i'],
    summary: 'Update the search index of the filesystem.',
    usage: [
      {
        command: 'bfind index',
        description: 'Scan and index all specified directories and files in the filesystem.',
      },
    ],
    action: buildIndex,
  })

  config.initialize(program)

  program.parse()
}
