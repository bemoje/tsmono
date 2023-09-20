import { TrieMap } from '@bemoje/trie-map'
import { createDirectory, deleteDirectorySafe } from '@bemoje/util'
import fsp from 'fs/promises'
import path from 'path'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { INDEX_DATA_DIRPATH } from '../../constants/INDEX_DATA_DIRPATH'
import { WORD_TRIE_DIRPATH } from '../../constants/WORD_TRIE_DIRPATH'
import { SerializableSet } from '../../util/SerializableSet'

export async function saveIndex(FILEPATHS: string[], TRIE: TrieMap<SerializableSet<number>>): Promise<void> {
  await createDirectory(INDEX_DATA_DIRPATH)
  await deleteDirectorySafe(WORD_TRIE_DIRPATH)
  await createDirectory(WORD_TRIE_DIRPATH)
  for (const [key, value] of Object.entries(TRIE.root)) {
    await fsp.writeFile(
      path.join(WORD_TRIE_DIRPATH, key + '.json'),
      JSON.stringify(value, (key, val) => {
        return val instanceof Set ? [...val] : val
      }),
      'utf8'
    )
  }
  await fsp.writeFile(FILE_LIST_FILEPATH, JSON.stringify(FILEPATHS), 'utf8')
}
