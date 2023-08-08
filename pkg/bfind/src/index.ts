import { Config } from '@bemoje/commander-config'
import { round } from '@bemoje/node-util'
import { TrieMap } from '@bemoje/trie-map'
import { green, red, yellow } from 'cli-color'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { FILES_HASH_JSON_PATH } from './constants/FILES_HASH_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from './constants/WORD_TRIE_JSON_PATH'
import { buildIndex } from './core/buildIndex'
import { printSearchResult } from './core/printSearchResult'
import { search } from './core/search'
import { SerializableSet } from './util/SerializableSet'
import { getDiskDrivesWindows } from './util/getDiskDrivesWindows'

export const config = new Config('bemoje', 'bfind', {
  'print-scan-errors': {
    description: [
      'Whether to print errors when scans of files or directories fail.',
      'Reasons could be permission denied or other errors.',
    ].join(' '),
    default: false,
    required: false,
    parse: (string: string): boolean => {
      if (string !== 'true' && string !== 'false') {
        console.error(`The value ${string} is not a valid boolean value. Accepted values are 'true' and 'false'.`)
        process.exit(1)
      }
      return string === 'true'
    },
  },
  'print-scan-ignored': {
    description: [
      'Whether to print when files or directories are skipped during scan.',
      'This is controlled by the user settings for what to ignore/skip.',
    ].join(' '),
    default: true,
    required: true,
    parse: (string: string): boolean => {
      if (string !== 'true' && string !== 'false') {
        console.error(`The value ${string} is not a valid boolean value. Accepted values are 'true' and 'false'.`)
        process.exit(1)
      }
      return string === 'true'
    },
  },
  'max-results': {
    description: ['The maximum number of search results to display.'].join(' '),
    default: 30,
    required: true,
    parse: (string: string): number => {
      const n = Number(string)
      if (!Number.isInteger(n)) {
        console.error(`The value ${string} is not an integer.`)
        process.exit(1)
      }
      return n
    },
  },
  'rootdirs': {
    description: [
      'The root directories which should be indexed for search.',
      'Use semicolon as separator for multiple directories.',
    ].join(' '),
    default: process.platform.includes('win') ? getDiskDrivesWindows() : [path.parse(process.cwd()).root],
    required: true,
    parse: (string: string): string[] => {
      const arr = string.split(';').map((d) => d.trim())
      arr.forEach((dir) => {
        if (!fs.existsSync(dir)) {
          console.error(`The directory ${dir} does not exist.`)
          process.exit(1)
        }
        if (!fs.statSync(dir).isDirectory()) {
          console.error(`The path ${dir} is not a directory.`)
          process.exit(1)
        }
      })
      fs.rmSync(FILES_HASH_JSON_PATH, { force: true })
      fs.rmSync(WORD_TRIE_JSON_PATH, { force: true })
      return arr
    },
  },
  'ignore': {
    description:
      'Directories to ignore/skip when scanning (regex mode). Use semicolon as separator for multiple expressions.',
    default: [
      '^\\w:\\/windows',
      '^\\w:\\/Program Files',
      '^\\w:\\/ProgramData',
      '^\\w:\\/System Volume Information$',
      '\\/node_modules$',
      '\\/\\.git$',
      '\\/AppData$',
      '\\/Application Data$',
    ],
    required: true,
    parse: (string: string): string[] => {
      const arr = string.split(';').map((d) => d.trim())
      fs.rmSync(FILES_HASH_JSON_PATH, { force: true })
      fs.rmSync(WORD_TRIE_JSON_PATH, { force: true })
      return arr
    },
  },
})

export const program = new Command()
  .name('bfind')
  .description('Fast indexed search tool for file- and direcoty names.')
  .version('0.0.1')
  .argument('[search...]', 'A full or partial directory name of the repository to find and open.')
  .option('-s, --scan', 'Scan disk again and refresh the index.')
  .option('-a, --all', 'Force print all search results.')
  .action(async (args: string[], options = {}) => {
    process.on('uncaughtException', console.log)
    try {
      config.assertNoMissingRequired()
      const keywords = args.join(' ').trim()

      const indexExists = fs.existsSync(WORD_TRIE_JSON_PATH) && fs.existsSync(FILES_HASH_JSON_PATH)
      if (!indexExists || options.scan) await buildIndex()

      const PATHLIST: string[] = JSON.parse(await fs.promises.readFile(FILES_HASH_JSON_PATH, 'utf8'))
      const INDEX: TrieMap<SerializableSet<number>> = TrieMap.fromJSON(
        await fs.promises.readFile(WORD_TRIE_JSON_PATH, 'utf8'),
      )
      const indexAge = round((Date.now() - fs.statSync(FILES_HASH_JSON_PATH).mtimeMs) / 1000 / 60 / 60 / 24, 1)
      const color = indexAge > 7 ? red : indexAge > 3 ? yellow : green
      console.log(`Index is ${color(indexAge)} days old.`)

      const t1 = Date.now()
      const searchResult = search(keywords, PATHLIST, INDEX)
      const executionTime = Date.now() - t1 + ' ms'
      await printSearchResult(searchResult, keywords, options.all)
      console.log('Search time: ' + executionTime + '\n')
    } catch (error: any) {
      if (config.settings['print-scan-errors']) {
        console.error(error.message)
      }
    }
  })

config.initialize(program)

program
  .command('config-json')
  .description('Get the filepath to where the config file is (JSON)')
  .action(() => console.log(path.join(config.appdataDirectory, 'config.json')))

program.parse()
