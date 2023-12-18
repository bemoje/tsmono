import { CommandBuilder } from '@bemoje/cli'

const regDigits = /([0-9].*){8}[0-9]/
const regSplit = /[- _./\\]+/

/**
 * Splits a string to constituent words and also splits camelCase into different words.
 * Used for both raw user search string input with multiple search terms in a single string and it is also used for
 * generating search keywords from a filepath. Each word is also normalized to lower case and max word length cutoff.
 */
export function normalizeKeys(cmd: CommandBuilder, searchString: string, isDir: boolean): Set<string> {
  const config = cmd.root.db.config
  // ignore words with 5 or more digits (e.g. 12345)
  const result: Set<string> = new Set()
  const insensitive = config.get<boolean>('caseInsensitive') === true
  const split = (insensitive ? searchString.toLowerCase() : searchString).split(regSplit).filter((s) => !!s.trim())
  if (!isDir) split[split.length - 1] = '.' + split[split.length - 1]
  for (const word of split) {
    if (regDigits.test(word)) continue
    if (word.length > 24) {
      result.add(word.substring(0, 12))
      result.add(word.substring(word.length - 1 - 12))
    } else {
      result.add(word)
    }
  }
  return result
}
