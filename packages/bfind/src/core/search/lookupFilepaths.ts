import { setUnion } from '@bemoje/util'
import { config } from '../config'

export function lookupFilepaths(keywords: Set<string>, indices: Array<Set<number>>, PATHS: string[]): Array<string> {
  const filepaths: string[] = []
  for (const i of [...setUnion(indices)]) {
    const insensitive = config.userconfig.get('case-insensitive') as boolean
    const filepath = insensitive ? PATHS[i].toLowerCase() : PATHS[i]
    let hasAllKeywords = true
    for (const kw of keywords) {
      if (!filepath.includes(kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(PATHS[i])
  }
  return filepaths
}
