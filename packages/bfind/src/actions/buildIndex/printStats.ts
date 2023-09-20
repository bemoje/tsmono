import { bytesToMegabytes, MS_IN_SECOND, round } from '@bemoje/util'
import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'
import { WORD_TRIE_FILEPATH } from '../../constants/WORD_TRIE_FILEPATH'
import { IBuildIndexStats } from './IBuildIndexStats'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  const trieSize = (await fsp.stat(WORD_TRIE_FILEPATH)).size
  const pathsSize = (await fsp.stat(FILE_LIST_FILEPATH)).size

  const entries = Object.entries(stats.fileTypes).sort((a, b) => b[1] - a[1])
  const i = entries.findIndex((e) => e[1] < 1000)
  const entriesTop = entries.splice(0, i - 1)
  entriesTop.push(['OTHER-TYPES', entries.reduce((acc, e) => acc + e[1], 0)])
  delete stats.fileTypes
  console.log({
    fileTypes: Object.fromEntries(entriesTop),
    ...stats,
    indexSizeMB: round(bytesToMegabytes(trieSize + pathsSize)),
  })
  console.log('Indexing completed in ' + round((Date.now() - t0) / MS_IN_SECOND) + ' seconds.')
}
