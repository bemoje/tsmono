import { default as fs, default as fsp } from 'fs-extra'
import { config } from '../../../core/config'

export async function sortByLastModified(filepaths: string[]): Promise<[fs.Stats, string][]> {
  const stats: [fs.Stats, string][] = []
  for (const fspath of filepaths) {
    try {
      stats.push([await fsp.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  stats.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  return stats.slice(stats.length - config.userconfig.get('max-results'))
}
