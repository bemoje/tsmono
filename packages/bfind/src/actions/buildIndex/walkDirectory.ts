import { TrieMap } from '@bemoje/trie-map'
import { colors, FSPathFilter, isWindows, memoryUsage, round } from '@bemoje/util'
import path from 'path'
import walkdir from 'walkdir'
import { config } from '../../core/config'
import { normalizeKeys } from '../../util/normalizeKeys'
import { normalizePathSep } from '../../util/normalizePathSep'
import { IBuildIndexStats } from './IBuildIndexStats'

export function walkDirectory(
  dirpath: string,
  filter: FSPathFilter,
  stats: IBuildIndexStats,
  PATHS: string[],
  TRIE: TrieMap<Set<number>>
): Promise<void> {
  const isWin = isWindows()
  const regexReplace = /\\+/g
  const regexNumeric = /^\.[0-9]+$/
  if (isWin) dirpath = dirpath.replace(regexReplace, '/')

  return new Promise((resolve, reject) => {
    const walker = walkdir(dirpath, {
      find_links: true,
      no_return: true,
      return_object: false,
      filter: (dpath: string, files: string[]) => {
        if (isWin) dpath = dpath.replace(regexReplace, '/')
        if (!filter.validateDirpath(dpath)) return []
        return files.filter((filename) => {
          if (!filename.includes('.')) {
            return filter.validateDirpath(dpath + '/' + filename)
          }
          if (!filter.validateFilename(filename)) return false
          if (!filter.validateFilepath(dpath + '/' + filename)) return false
          return true
        })
      },
    })

    walker.on('path', (fspath, stat) => {
      if (isWin) fspath = fspath.replace(regexReplace, '/')
      if (stat.isFile()) {
        const ext = path.extname(fspath).toLowerCase()
        if (!ext || ext.length > 15 || regexNumeric.test(ext)) return
        stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1
      }
      const index = stats.filesIndexed++
      PATHS[index] = fspath
      const searchWords = normalizeKeys(path.basename(fspath), stat.isDirectory())
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
            TRIE.set(key, new Set([index]))
            stats.fileRefsIndexed++
          }
        }
      }
      if (index % 25000 === 0 && index) {
        console.log(colors.cyan(index / 1000 + 'k files processed'))
        const mem = round((memoryUsage(0).rss / 2000) * 100)
        if (mem >= 85) console.log(colors.red(mem + '% memory used'))
        else if (mem >= 75) console.log(colors.yellow(mem + '% memory used'))
      }
    })

    walker.on('end', () => {
      walker.removeAllListeners()
      walker.end()
      resolve()
    })

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('error', (error) => {
        console.error(error.message)
        reject(error)
      })
    }

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('fail', (path, error) => {
        console.log('Could not index path: ' + normalizePathSep(path))
      })
    }
  })
}
