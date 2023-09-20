import { setUnion } from '@bemoje/util'
import { config } from '../../core/config'

export function lookupFilepaths(keywords: Set<string>, indices: Array<Set<number>>, PATHS: string[]): Array<string> {
  const filepaths: string[] = []
  for (const i of setUnion(indices)) {
    let _filepath = PATHS[i]
    if (/^[0-9]/.test(_filepath)) {
      const sepIndex = _filepath.indexOf('/')
      const dirIndex = Number(_filepath.substring(0, sepIndex))
      _filepath = PATHS[dirIndex] + _filepath.substring(sepIndex)
    }
    const filepath = (config.userconfig.get('case-insensitive') as boolean) ? _filepath.toLowerCase() : _filepath
    let hasAllKeywords = true
    for (const kw of keywords) {
      if (!filepath.includes(kw)) {
        hasAllKeywords = false
        break
      }
    }
    if (!hasAllKeywords) continue
    filepaths.push(_filepath)
  }
  return filepaths
}
