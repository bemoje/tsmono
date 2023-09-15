import { setUnion } from '@bemoje/util'

export function lookupFilepaths(keywords: Set<string>, indices: Array<Set<number>>, PATHS: string[]): Array<string> {
  const filepaths: string[] = []
  for (const i of [...setUnion(indices)]) {
    const filepath = PATHS[i].toLowerCase()
    let hasAllKeywords = true
    for (const kw of keywords) {
      if (!filepath.includes(kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(PATHS[i].replace(/\\+/g, '/'))
  }
  return filepaths
}
