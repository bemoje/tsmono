import { TrieMap } from '@bemoje/trie-map'
import { createDirectory } from '@bemoje/util'
import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { INDEX_DATA_DIRPATH } from '../../constants/INDEX_DATA_DIRPATH'
import { WORD_TRIE_FILEPATH } from '../../constants/WORD_TRIE_FILEPATH'
import { SerializableSet } from '../../util/SerializableSet'

export async function saveIndex(PATHS: string[], TRIE: TrieMap<SerializableSet<number>>): Promise<void> {
  await createDirectory(INDEX_DATA_DIRPATH)
  await fsp.writeFile(WORD_TRIE_FILEPATH, JSON.stringify(TRIE), 'utf8')
  await fsp.writeFile(FILE_LIST_FILEPATH, JSON.stringify(PATHS), 'utf8')
}
