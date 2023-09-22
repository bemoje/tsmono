import { setUnion } from '@bemoje/util'
import { config } from '../../core/config'

export function lookupFilepaths(keywords: string[], indices: Array<Set<number>>, PATHS: string[]): Array<string> {
  const isInsensitive = config.userconfig.get('case-insensitive') as boolean
  const filepaths: string[] = []
  for (const i of setUnion(indices)) {
    const filepath = PATHS[i]
    const casedFilepath = isInsensitive ? filepath.toLowerCase() : filepath
    let hasAllKeywords = true
    for (const kw of keywords) {
      if (!casedFilepath.includes(isInsensitive ? kw.toLowerCase() : kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(filepath)
  }
  return filepaths
}
