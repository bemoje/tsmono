import { TrieMap } from '@bemoje/trie-map'
import fs from 'fs'
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
    fileTypes: {},
  }

  // data
  const FILEPATHS: string[] = []
  const TRIE = new TrieMap<SerializableSet<number>>()
  const filter = createPathFilter()

  // walk directories
  const directories = config.userconfig.get('rootdirs')
  await Promise.all(
    directories.map((dirpath) => {
      if (!fs.existsSync(dirpath)) return Promise.resolve()
      return walkDirectory(dirpath, filter, stats, FILEPATHS, TRIE)
    })
  )

  // write to disk
  await saveIndex(FILEPATHS, TRIE)

  // print stats
  await printStats(t0, stats)
}
