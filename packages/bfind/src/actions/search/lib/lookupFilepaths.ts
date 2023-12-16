import { CommandBuilder } from '@bemoje/cli'
import { setUnion } from '@bemoje/util'

export function lookupFilepaths(
  cmd: CommandBuilder,
  keywords: string[],
  indices: Array<Set<number>>,
  PATHS: string[]
): Array<string> {
  const config = cmd.root.db.config

  const isInsensitive = config.get<boolean>('caseInsensitive') === true
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
