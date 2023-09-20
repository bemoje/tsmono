import { TrieMap } from '@bemoje/trie-map'
import { arrLast, colors, FSPathFilter, isWindows } from '@bemoje/util'
import walkdir from 'walkdir'
import { config } from '../../core/config'
import { normalizeKeys } from '../../util/normalizeKeys'
import { normalizePathSep } from '../../util/normalizePathSep'
import { SerializableSet } from '../../util/SerializableSet'
import { IBuildIndexStats } from './IBuildIndexStats'

export function walkDirectory(
  dirpath: string,
  filter: FSPathFilter,
  stats: IBuildIndexStats,
  PATHS: string[],
  TRIE: TrieMap<SerializableSet<number>>
): Promise<void> {
  const DIRTRIE = new TrieMap<number>()
  const isWin = isWindows()
  const regexReplace = /\\+/g
  const regexSplit = isWin ? /\\+/ : /\//
  if (isWin) dirpath = dirpath.replace(regexReplace, '/')

  return new Promise((resolve, reject) => {
    const walker = walkdir(dirpath, {
      find_links: false,
      no_return: true,
      filter: (dpath: string, files: string[]) => {
        if (isWin) dpath = dpath.replace(regexReplace, '/')
        if (!filter.validateDirpath(dpath)) return []
        return files.filter((filename) => {
          return filter.validateFilepath(dpath + '/' + filename)
        })
      },
    })

    walker.on('path', (fspath, stat) => {
      const isDir = stat.isDirectory()
      const arrFspath = fspath.split(regexSplit)
      const basename = arrLast(arrFspath)
      const index = stats.filesIndexed++
      if (isDir) {
        DIRTRIE.set(arrFspath, index)
        if (isWin) fspath = fspath = arrFspath.join('/')
      } else {
        const ext = basename.substring(basename.lastIndexOf('.')).toLowerCase()
        stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1
        fspath = DIRTRIE.get(arrFspath.slice(0, arrFspath.length - 1)) + '/' + basename
      }
      PATHS[index] = fspath
      const searchWords = normalizeKeys(basename, isDir)
      for (const word of searchWords) {
        stats.keywordsIndexed++
        for (let j = 0; j < word.length - 1; j++) {
          const key = word.substring(j) as unknown as string[]
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
