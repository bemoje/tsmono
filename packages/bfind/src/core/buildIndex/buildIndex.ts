import { TrieMap } from '@bemoje/trie-map'
import { SerializableSet } from '../../util/SerializableSet'
import { config } from '../config'
import { IBuildIndexStats } from './IBuildIndexStats'
import { createPathFilter } from './createPathFilter'
import { printStats } from './printStats'
import { saveIndex } from './saveIndex'
import { walkDirectory } from './walkDirectory'

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
