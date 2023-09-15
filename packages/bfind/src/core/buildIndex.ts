import { TrieMap } from '@bemoje/trie-map'
import { FSPathFilter } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { FILE_LIST_JSON_PATH } from '../constants/FILE_LIST_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from '../constants/WORD_TRIE_JSON_PATH'
import { SerializableSet } from './SerializableSet'
import { config } from './config'
import { extractSearchKeys } from './extractSearchKeys'

export async function buildIndex(): Promise<void> {
  const PATHS: string[] = []
  const TRIE: TrieMap<SerializableSet<number>> = new TrieMap()

  const pathFilter = new FSPathFilter()
  pathFilter.isCaseInsensitive = true

  config.userconfig.get('ignore').forEach((reg: string) => {
    pathFilter.ignoreDirpathRegex(new RegExp(reg.replace(/\/|\\/g, path.sep), 'i'))
  })

  if (config.userconfig.get('print-scan-ignored')) {
    pathFilter.on('invalid', (type, fspath) => {
      console.log(`Ignoring ${type}: ${fspath}`)
    })
  }

  let nextIndex = 0
  const stats = {
    filesIndexed: 0,
    keywordsIndexed: 0,
    fileRefsIndexed: 0,
  }

  function walkDirectory(rootdirpath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const walker = walkdir(rootdirpath, {
        find_links: false,
        no_return: true,
        filter: (dirpath: string, files: string[]) => {
          if (!pathFilter.validateDirpath(dirpath)) return []
          return files.filter((filename) => {
            if (!pathFilter.validateFilename(filename)) return false
            if (!pathFilter.validateFilepath(path.join(dirpath, filename))) return false
            return true
          })
        },
      })

      walker.on('path', function (filepath, stat) {
        const index = nextIndex++
        PATHS[index] = filepath
        const searchWords = extractSearchKeys(path.basename(filepath), stat.isDirectory())
        for (const word of searchWords) {
          stats.keywordsIndexed++
          for (let j = 0; j < word.length - 2; j++) {
            const key = [...word.substring(j)]
            const indices = TRIE.get(key)
            if (indices) {
              if (!indices.has(index)) {
                indices.add(index)
                stats.fileRefsIndexed++
              }
            } else {
              TRIE.set(key, new SerializableSet([index]))
              stats.fileRefsIndexed++
            }
          }
        }
        stats.filesIndexed++
      })

      walker.on('end', () => resolve())

      if (config.userconfig.get('print-scan-errors')) {
        walker.on('error', (error) => console.log(error.message))
      }

      if (config.userconfig.get('print-scan-errors')) {
        walker.on('fail', (path, error) => console.log('Could not index path: ' + path))
      }
    })
  }

  const t0 = Date.now()
  await Promise.all(config.userconfig.get('rootdirs').map(walkDirectory))
  await fs.promises.mkdir(path.dirname(WORD_TRIE_JSON_PATH), { recursive: true })
  await fs.promises.writeFile(WORD_TRIE_JSON_PATH, TRIE.toJson(false), 'utf8')
  await fs.promises.writeFile(FILE_LIST_JSON_PATH, JSON.stringify(PATHS), 'utf8')
  const trieSize = (await fs.promises.stat(WORD_TRIE_JSON_PATH)).size
  const pathsSize = (await fs.promises.stat(FILE_LIST_JSON_PATH)).size
  const indexSizeMB = (trieSize + pathsSize) / 1024 / 1024
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  console.log({ ...stats, indexSizeMB: Math.round(indexSizeMB) })
}
