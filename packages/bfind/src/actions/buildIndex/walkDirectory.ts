import { TrieMap } from '@bemoje/trie-map'
import { colors, FSPathFilter } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import walkdir from 'walkdir'
import { config } from '../../core/config'
import { normalizeKeys } from '../../util/normalizeKeys'
import { normalizePathSep } from '../../util/normalizePathSep'
import { SerializableSet } from '../../util/SerializableSet'
import { IBuildIndexStats } from './IBuildIndexStats'

path
fs

export async function walkDirectory(
  dirpath: string,
  filter: FSPathFilter,
  stats: IBuildIndexStats,
  PATHS: string[],
  TRIE: TrieMap<SerializableSet<number>>
): Promise<void> {
  const re = /\\+/g
  return await new Promise((resolve, reject) => {
    const walker = walkdir(dirpath, {
      find_links: false,
      no_return: true,
      filter: (dirpath: string, files: string[]) => {
        dirpath = dirpath.replace(re, '/')
        if (!filter.validateDirpath(dirpath)) return []
        return files.filter((filename) => {
          return filter.validateFilepath(dirpath + '/' + filename)
        })
      },
    })

    walker.on('path', (filepath, stat) => {
      filepath = dirpath.replace(re, '/')
      const index = stats.filesIndexed++
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
      if (index % 25000 === 0 && index) console.log(colors.cyan(index + ' files indexed.'))
    })

    walker.on('end', () => resolve())

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('error', (error) => console.log(error.message))
    }

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('fail', (path, error) => console.log('Could not index path: ' + normalizePathSep(path)))
    }
  })
}
