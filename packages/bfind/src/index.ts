import { TrieMap } from '@bemoje/trie-map'
import { colors } from '@bemoje/util'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { FILE_LIST_JSON_PATH } from './constants/FILE_LIST_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from './constants/WORD_TRIE_JSON_PATH'
import { buildIndex } from './core/buildIndex'
import { config } from './core/config'
import { extractSearchKeys } from './core/extractSearchKeys'
import { printSearchResult } from './core/printSearchResult'
import { search } from './core/search'
const { green, red, yellow } = colors

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
  .argument(
    '[search...]',
    'Each argument is a search term. If multiple terms are provided, ' +
      'they ALL must be present in the path to be considered a search hit.'
  )
  .option('-s, --scan', 'Scan disk again and refresh the index.')
  .option('-a, --all', 'Force print all search results.')
  .action(async (args: string[], options = {}) => {
    const searchString = args.join(' ').trim()
    const isDir = !searchString.includes('.')
    const keywords = extractSearchKeys(searchString, isDir)

    const indexExists = fs.existsSync(WORD_TRIE_JSON_PATH) && fs.existsSync(FILE_LIST_JSON_PATH)
    if (!indexExists || options.scan) await buildIndex()
    if (!options.scan && !keywords.size) return console.log('No search terms provided.')

    const PATHS: string[] = JSON.parse(await fs.promises.readFile(FILE_LIST_JSON_PATH, 'utf8'))
    const TRIE: TrieMap<Set<number>> = TrieMap.fromJSON(await fs.promises.readFile(WORD_TRIE_JSON_PATH, 'utf8'))

    const indexAge = Math.floor((Date.now() - fs.statSync(FILE_LIST_JSON_PATH).mtimeMs) / 1000 / 60 / 60 / 24)
    const color = indexAge > 7 ? red : indexAge > 3 ? yellow : green

    const t1 = Date.now()
    const searchResult = search(keywords, PATHS, TRIE)
    const executionTime = Date.now() - t1 + ' ms'
    await printSearchResult(searchResult, keywords, options.all)
    console.log('Search keys: ' + [...keywords].map((s) => green(s)).join(', '))
    console.log(`Index is ${color(indexAge.toString())} days old.`)
    console.log('Search time: ' + executionTime + '\n')
  })

config.initialize(program)

process.on('uncaughtException', (error: unknown) => {
  if (config.data.user.get('print-scan-errors')) {
    console.error(error['message'] ? error['message'] : error)
  }
})

program
  .command('config-json')
  .description('Print the filepath to where the config file is (JSON)')
  .action(() => console.log(path.join(config.data.directory, 'config.json')))

program.parse()
