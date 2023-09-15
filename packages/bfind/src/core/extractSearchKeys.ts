import { words } from 'lodash'

/**
 * Splits a string to constituent words and also splits camelCase into different words.
 * Used for both raw user search string input with multiple search terms in a single string and it is also used for
 * generating search keywords from a filepath. Each word is also normalized to lower case and max word length cutoff.
 */
export function extractSearchKeys(searchString: string, isDir?: boolean): Set<string> {
  // ignore words with 5 or more digits (e.g. 12345)
  const reg5Digits = /[0-9].*[0-9].*[0-9].*[0-9].*[0-9]/
  const result: Set<string> = new Set()
  const split = words(searchString)
  if (!isDir) split[split.length - 1] = '.' + split[split.length - 1]
  for (let word of split) {
    word = word.toLowerCase()
    if (reg5Digits.test(word)) continue
    word = word.substring(0, 9)
    result.add(word)
  }
  return result
}
