import { words } from 'lodash'
import { config } from './config'

/**
 * Splits a string to constituent words and also splits camelCase into different words.
 * Used for both raw user search string input with multiple search terms in a single string and it is also used for
 * generating search keywords from a filepath. Each word is also normalized to lower case and max word length cutoff.
 */
export function normalizeKeys(searchString: string, isDir: boolean): Set<string> {
  // ignore words with 5 or more digits (e.g. 12345)
  const reg5Digits = /[0-9].*[0-9].*[0-9].*[0-9].*[0-9]/
  const result: Set<string> = new Set()
  const insensitive = config.userconfig.get('case-insensitive') as boolean
  const split = words(insensitive ? searchString.toLowerCase() : searchString)
  if (!isDir) split[split.length - 1] = '.' + split[split.length - 1]
  for (const word of split) {
    if (reg5Digits.test(word)) continue
    if (word.length > 16) {
      result.add(word.substring(0, 8))
      result.add(word.substring(word.length - 8, word.length))
    } else {
      result.add(word.substring(0, 15))
    }
  }
  return result
}
