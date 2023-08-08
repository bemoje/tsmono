import { memoryUsage, NumberFormatter } from '@bemoje/node-util'
import { TrieMap } from '@bemoje/trie-map'
import fs from 'fs'
import { mkdirp } from 'mkdirp'
import path from 'path'
import walkdir from 'walkdir'
import { FILES_HASH_JSON_PATH } from '../constants/FILES_HASH_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from '../constants/WORD_TRIE_JSON_PATH'
import { config } from '../index'
import { IDirectoryWalkStatus } from '../types/IDirectoryWalkStatus'
import { extractSearchKeys } from '../util/extractSearchKeys'
import { PathFilter } from '../util/PathFilter'
import { SerializableSet } from '../util/SerializableSet'

export async function buildIndex(): Promise<void> {
  const rootdirs: Array<string> = config.settings['rootdirs']
  const PATHLIST: string[] = []
  const INDEX: TrieMap<SerializableSet<number>> = new TrieMap()

  const pathFilter = new PathFilter()
  config.settings['ignore'].forEach((reg: string) => {
    pathFilter.ignoreDirpathRegex(new RegExp(reg.replace(/\/|\\/g, path.sep), 'i'))
  })
  if (config.settings['print-scan-ignored']) {
    pathFilter.on('invalid', (type, fspath) => {
      console.log(`Ignoring ${type}: ${fspath}`)
    })
  }

  const count = {
    filesIndexed: 0,
    keywords: 0,
    indexedFileRefs: 0,
    keywordsNormalized: 0,
  }

  function getStatus(filepath?: string): IDirectoryWalkStatus {
    const formatter = new NumberFormatter(0).locale('en-US')
    const status: IDirectoryWalkStatus = {
      currentDirectory: filepath ? filepath.split(/(\\|\/)+/) : ['COMPLETED'],
      filesIndexed: formatter.format(count.filesIndexed),
      keywords: formatter.format(count.keywords),
      indexedFileRefs: formatter.format(count.indexedFileRefs),
      keywordsNormalized: formatter.format(count.keywordsNormalized),
      memory: memoryUsage(),
    }
    return status
  }

  function walkDirectory(rootdirpath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const emitter = walkdir(rootdirpath, {
        find_links: false,
        no_return: true,
        filter: (dirpath: string, files: string[]) => {
          dirpath = dirpath.toLowerCase()
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

      let nextIndex = -1
      emitter.on('path', function (filepath, stat) {
        const index = ++nextIndex
        filepath = filepath.toLowerCase()
        PATHLIST[index] = filepath
        const searchWords = extractSearchKeys(path.basename(filepath))
        for (const word of searchWords) {
          count.keywords++
          for (let j = 0; j < word.length - 2; j++) {
            const key = Array.from(word.substring(j))
            const indices = INDEX.get(key)
            if (indices) {
              if (!indices.has(index)) {
                indices.add(index)
                count.indexedFileRefs++
              }
            } else {
              INDEX.set(key, new SerializableSet([index]))
              count.keywordsNormalized++
              count.indexedFileRefs++
            }
          }
        }
        count.filesIndexed++
      })

      emitter.on('end', () => {
        resolve()
      })

      emitter.on('error', (error) => {
        if (config.settings['print-scan-errors']) {
          console.log(error.message)
        }
      })

      emitter.on('fail', (path, error) => {
        if (config.settings['print-scan-errors']) {
          console.log('Could not index path: ' + path)
        }
      })
    })
  }
  console.log({ rootdirs })
  const t0 = Date.now()
  await Promise.all(rootdirs.map(walkDirectory))
  await mkdirp(path.dirname(WORD_TRIE_JSON_PATH))
  await fs.promises.writeFile(WORD_TRIE_JSON_PATH, INDEX.toJson(false), 'utf8')
  await fs.promises.writeFile(FILES_HASH_JSON_PATH, JSON.stringify(PATHLIST), 'utf8')
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  console.log(getStatus())
  process.exit(1)
}
