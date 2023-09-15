import fs from 'fs'
import fsp from 'fs/promises'
import { config } from '../../config'

export async function sortByLastModified(filepaths: string[], printAllResults: boolean): Promise<[fs.Stats, string][]> {
  const stats: [fs.Stats, string][] = []
  for (const fspath of filepaths) {
    try {
      stats.push([await fsp.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  stats.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  return printAllResults ? stats : stats.slice(stats.length - config.userconfig.get('max-results'))
}
