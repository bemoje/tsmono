import { TrieMap } from '@bemoje/trie-map'
import { emptyDirectory } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { WORD_TRIE_DIRPATH } from '../../constants/WORD_TRIE_DIRPATH'

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
