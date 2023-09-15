import { TrieMap } from '@bemoje/trie-map'
import { FSPathFilter } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { FILE_LIST_JSON_PATH } from '../constants/FILE_LIST_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from '../constants/WORD_TRIE_JSON_PATH'
import { config } from './config'
import { extractSearchKeys } from './extractSearchKeys'

export async function buildIndex(): Promise<void> {
  const rootdirs: Array<string> = config.data.user.get('rootdirs')
  const PATHS: string[] = []
  const TRIE: TrieMap<SerializableSet<number>> = new TrieMap()

  const pathFilter = new FSPathFilter()
  pathFilter.isCaseInsensitive = true
  config.data.user.get('ignore').forEach((reg: string) => {
    pathFilter.ignoreDirpathRegex(new RegExp(reg.replace(/\/|\\/g, path.sep), 'i'))
  })
  if (config.data.user.get('print-scan-ignored')) {
    pathFilter.on('invalid', (type, fspath) => {
      console.log(`Ignoring ${type}: ${fspath}`)
    })
  }

  const count = {
    filesIndexed: 0,
    keywordsIndexed: 0,
    fileRefsIndexed: 0,
  }

  let nextIndex = -1

  function walkDirectory(rootdirpath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const emitter = walkdir(rootdirpath, {
        find_links: false,
        no_return: true,
        filter: (dirpath: string, files: string[]) => {
          if (!pathFilter.validateDirpath(dirpath)) {
            return []
          }
          return files.filter((filename) => {
            if (!pathFilter.validateFilename(filename)) {
              return false
            }
            const filepath = path.join(dirpath, filename)
            if (!pathFilter.validateFilepath(filepath)) {
              return false
            }
            return true
          })
        },
      })

      emitter.on('path', function (filepath, stat) {
        const index = ++nextIndex
        PATHS[index] = filepath
        const searchWords = extractSearchKeys(path.basename(filepath), stat.isDirectory())
        for (const word of searchWords) {
          count.keywordsIndexed++
          for (let j = 0; j < word.length - 2; j++) {
            const key = [...word.substring(j)]
            const indices = TRIE.get(key)
            if (indices) {
              if (!indices.has(index)) {
                indices.add(index)
                count.fileRefsIndexed++
              }
            } else {
              TRIE.set(key, new SerializableSet([index]))
              count.fileRefsIndexed++
            }
          }
        }
        count.filesIndexed++
      })

      emitter.on('end', () => {
        resolve()
      })

      emitter.on('error', (error) => {
        if (config.data.user.get('print-scan-errors')) {
          console.log(error.message)
        }
      })

      emitter.on('fail', (path, error) => {
        if (config.data.user.get('print-scan-errors')) {
          console.log('Could not index path: ' + path)
        }
      })
    })
  }
  const t0 = Date.now()
  await Promise.all(rootdirs.map(walkDirectory))
  fs.mkdir
  await fs.promises.mkdir(path.dirname(WORD_TRIE_JSON_PATH), { recursive: true })
  await fs.promises.writeFile(WORD_TRIE_JSON_PATH, TRIE.toJson(false), 'utf8')
  await fs.promises.writeFile(FILE_LIST_JSON_PATH, JSON.stringify(PATHS), 'utf8')
  const indexSizeMB = (fs.statSync(WORD_TRIE_JSON_PATH).size + fs.statSync(FILE_LIST_JSON_PATH).size) / 1024 / 1024
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  console.log({ ...count, indexSizeMB: Math.round(indexSizeMB) })
  process.exit(1)
}

class SerializableSet<T> extends Set<T> {
  constructor(...args: any[]) {
    super(...args)
  }
  toJSON() {
    return [...this]
  }
}
