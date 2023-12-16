import { CommandBuilder } from '@bemoje/cli'
import { default as fs, default as fsp } from 'fs-extra'

export async function sortByLastModified(cmd: CommandBuilder, filepaths: string[]): Promise<[fs.Stats, string][]> {
  const config = cmd.root.db.config
  const stats: [fs.Stats, string][] = []
  for (const fspath of filepaths) {
    try {
      stats.push([await fsp.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  stats.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  return stats.slice(stats.length - config.get<number>('maxResults'))
}
