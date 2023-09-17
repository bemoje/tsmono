import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { WORD_TRIE_FILEPATH } from '../../constants/WORD_TRIE_FILEPATH'
import { IBuildIndexStats } from './IBuildIndexStats'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  const trieSize = (await fsp.stat(WORD_TRIE_FILEPATH)).size
  const pathsSize = (await fsp.stat(FILE_LIST_FILEPATH)).size
  console.log({ ...stats, indexSizeMB: Math.round((trieSize + pathsSize) / 1024 / 1024) })
}
