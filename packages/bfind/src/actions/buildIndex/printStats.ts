import { bytesToMegabytes, MS_IN_SECOND, round } from '@bemoje/util'
import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { WORD_TRIE_FILEPATH } from '../../constants/WORD_TRIE_FILEPATH'
import { IBuildIndexStats } from './IBuildIndexStats'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  console.log('Indexing completed in ' + round((Date.now() - t0) / MS_IN_SECOND) + ' seconds.')
  const trieSize = (await fsp.stat(WORD_TRIE_FILEPATH)).size
  const pathsSize = (await fsp.stat(FILE_LIST_FILEPATH)).size
  console.log({ ...stats, indexSizeMB: round(bytesToMegabytes(trieSize + pathsSize)) })
}
