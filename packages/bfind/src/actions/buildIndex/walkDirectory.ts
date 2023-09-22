import { TrieMap } from '@bemoje/trie-map'
import { colors, FSPathFilter, isWindows, memoryUsage, round } from '@bemoje/util'
import path from 'path'
import walkdir from 'walkdir'
import { config } from '../../core/config'
import { normalizeKeys } from '../../util/normalizeKeys'
import { IBuildIndexStats } from './IBuildIndexStats'

const isWin = isWindows()
const regexReplace = /\\+/g

export function walkDirectory(
  dirpath: string,
  filter: FSPathFilter,
  stats: IBuildIndexStats,
  PATHS: string[],
  TRIE: TrieMap<Set<number>>
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isWin) dirpath = dirpath.replace(regexReplace, '/')
    const walker = walkdir(dirpath, {
      find_links: true,
      no_return: true,
      return_object: false,
      filter: (dpath: string, files: string[]) => {
        if (isWin) dpath = dpath.replace(regexReplace, '/')
        if (!filter.validateDirpath(dpath)) return []
        return files.filter((filename) => {
          if (filename.lastIndexOf('.') === -1) {
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
        if (!ext) return
        stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1
      }
      const index = stats.filesIndexed++
      PATHS[index] = fspath
      const normalized = normalizeKeys(path.basename(fspath), stat.isDirectory())
      for (const word of normalized) {
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
        const mem = round((memoryUsage(0).heapTotal / 2000) * 100)
        if (mem >= 85) console.log(colors.red(mem + '% memory used'))
        else if (mem >= 1) console.log(colors.yellow(mem + '% memory used'))
      }
    })

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('error', reject)
    }

    if (config.userconfig.get('print-scan-errors')) {
      walker.on('fail', (path) => console.log('Failed to read path: ' + path))
    }

    walker.on('end', () => {
      resolve()
    })
  })
}
