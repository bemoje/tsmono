import { TrieMap } from '@bemoje/trie-map'
import { FSPathFilter } from '@bemoje/util'
import fsp from 'fs/promises'
import path from 'path'
import walkdir from 'walkdir'
import { FILE_LIST_PATH } from '../../constants/FILE_LIST_PATH'
import { WORD_TRIE_PATH } from '../../constants/WORD_TRIE_PATH'
import { SerializableSet } from '../../util/SerializableSet'
import { config } from '../config'
import { normalizeKeys } from '../normalizeKeys'

export async function buildIndex(): Promise<void> {
  const PATHS: string[] = []
  const TRIE: TrieMap<SerializableSet<number>> = new TrieMap()

  const pfilter = new FSPathFilter()
  pfilter.isCaseInsensitive = true

  config.userconfig.get('ignore').forEach((reg: string) => {
    pfilter.ignoreDirpathRegex(new RegExp(reg.replace(/\/|\\/g, path.sep), 'i'))
  })

  if (config.userconfig.get('print-scan-ignored')) {
    pfilter.on('invalid', (type, fspath) => {
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
          if (!pfilter.validateDirpath(dirpath)) return []
          return files.filter((filename) => {
            if (!pfilter.validateFilename(filename)) return false
            if (!pfilter.validateFilepath(path.join(dirpath, filename))) return false
            return true
          })
        },
      })

      walker.on('path', function (filepath, stat) {
        const index = nextIndex++
        PATHS[index] = filepath
        const searchWords = normalizeKeys(path.basename(filepath), stat.isDirectory())
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
  await fsp.mkdir(path.dirname(WORD_TRIE_PATH), { recursive: true })
  await fsp.writeFile(WORD_TRIE_PATH, TRIE.toJson(false), 'utf8')
  await fsp.writeFile(FILE_LIST_PATH, JSON.stringify(PATHS), 'utf8')
  const trieSize = (await fsp.stat(WORD_TRIE_PATH)).size
  const pathsSize = (await fsp.stat(FILE_LIST_PATH)).size
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  console.log({ ...stats, indexSizeMB: Math.round((trieSize + pathsSize) / 1024 / 1024) })
}
