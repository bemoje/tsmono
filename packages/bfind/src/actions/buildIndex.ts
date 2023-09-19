import { TrieMap } from '@bemoje/trie-map'
import { config } from '../core/config'
import { SerializableSet } from '../util/SerializableSet'
import { IBuildIndexStats } from './buildIndex/IBuildIndexStats'
import { createPathFilter } from './buildIndex/createPathFilter'
import { printStats } from './buildIndex/printStats'
import { saveIndex } from './buildIndex/saveIndex'
import { walkDirectory } from './buildIndex/walkDirectory'

export async function buildIndex(): Promise<void> {
  // stats
  const t0 = Date.now()
  const stats: IBuildIndexStats = {
    filesIndexed: 0,
    keywordsIndexed: 0,
    fileRefsIndexed: 0,
  }

  // data
  const PATHS: string[] = []
  const TRIE: TrieMap<SerializableSet<number>> = new TrieMap()
  const filter = createPathFilter()

  // walk directories
  const directories = config.userconfig.get('rootdirs')
  await Promise.all(
    directories.map((dirpath) => {
      return walkDirectory(dirpath, filter, stats, PATHS, TRIE)
    })
  )

  // print stats
  printStats(t0, stats)

  // write to disk
  saveIndex(PATHS, TRIE)
}
