import fsp from 'fs/promises'
import { FILE_LIST_PATH } from '../../constants/FILE_LIST_PATH'
import { WORD_TRIE_PATH } from '../../constants/WORD_TRIE_PATH'
import { IBuildIndexStats } from './IBuildIndexStats'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  console.log('Indexing completed in ' + Math.floor((Date.now() - t0) / 1000) + ' seconds.')
  const trieSize = (await fsp.stat(WORD_TRIE_PATH)).size
  const pathsSize = (await fsp.stat(FILE_LIST_PATH)).size
  console.log({ ...stats, indexSizeMB: Math.round((trieSize + pathsSize) / 1024 / 1024) })
}
