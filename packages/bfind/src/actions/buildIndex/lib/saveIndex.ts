import fs from 'fs-extra'
import path from 'path'
import { emptyDirectory } from '@bemoje/util'
import { FILE_LIST_FILEPATH } from '../../../constants/lib/FILE_LIST_FILEPATH'
import { TrieMap } from '@bemoje/trie-map'
import { WORD_TRIE_DIRPATH } from '../../../constants/lib/WORD_TRIE_DIRPATH'

export async function saveIndex(FILEPATHS: string[], TRIE: TrieMap<Set<number>>): Promise<void> {
  await emptyDirectory(WORD_TRIE_DIRPATH)
  for (const [key, value] of Object.entries(TRIE.root)) {
    await fs.writeFile(
      path.join(WORD_TRIE_DIRPATH, key + '.json'),
      JSON.stringify(value, (key, val) => {
        return val instanceof Set ? [...val] : val
      }),
      'utf8'
    )
  }
  await fs.writeFile(FILE_LIST_FILEPATH, JSON.stringify(FILEPATHS), 'utf8')
}
