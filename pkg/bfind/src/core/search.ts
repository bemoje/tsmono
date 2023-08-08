import { arrEvery, setUnion, strToWords } from '@bemoje/node-util'
import { TrieMap } from '@bemoje/trie-map'
import { green } from 'cli-color'
import { SerializableSet } from '../util/SerializableSet'
import { extractSearchKeys } from '../util/extractSearchKeys'

export function search(
  searchString: string,
  PATHLIST: string[],
  INDEX: TrieMap<SerializableSet<number>>,
): Array<string> {
  const keywords: Set<string> = extractSearchKeys(searchString)
  console.log(
    'Search keys: ' +
      Array.from(keywords)
        .map((s) => green(s))
        .join(', '),
  )

  const indices: Array<Set<number>> = []
  for (const keyword of keywords) {
    const set: Set<number> = new Set()
    INDEX.getValues(Array.from(keyword)).forEach((indices: Set<number>) => {
      for (const i of indices) {
        set.add(Number(i))
      }
    })
    indices.push(set)
  }

  const union: Array<number> = Array.from(setUnion(indices))
  const searchWords = strToWords(searchString)
  const filepaths: string[] = []
  for (const i of union) {
    const filepath = PATHLIST[i]
    const hasAllKeywords = arrEvery(searchWords, (keyword) => {
      return filepath.includes(keyword.toLowerCase())
    })
    if (!hasAllKeywords) continue
    filepaths.push(filepath.replace(/\\+/g, '/'))
  }

  return filepaths
}
