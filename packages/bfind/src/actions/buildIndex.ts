import { gracefulProcessExit } from '@bemoje/commander-config'
import { TrieMap } from '@bemoje/trie-map'
import { asyncTasksLimit } from '@bemoje/util'
import fs from 'fs'
import { config } from '../core/config'
import { IBuildIndexStats } from './buildIndex/IBuildIndexStats'
import { createPathFilter } from './buildIndex/createPathFilter'
import { printStats } from './buildIndex/printStats'
import { saveIndex } from './buildIndex/saveIndex'
import { walkDirectory } from './buildIndex/walkDirectory'

export async function buildIndex(): Promise<void> {
  // graceful exit on error
  process.on('uncaughtException', (error: unknown) => {
    if (config.userconfig.get('print-scan-errors')) {
      gracefulProcessExit(error['message'] ? error['message'] : error)
    }
  })

  // data
  const t0 = Date.now()
  const FILEPATHS: string[] = []
  const TRIE = new TrieMap<Set<number>>()
  const filter = createPathFilter()
  const stats: IBuildIndexStats = {
    filesIndexed: 0,
    keywordsIndexed: 0,
    fileRefsIndexed: 0,
    fileTypes: {},
  }

  // search root
  const rootdirs = config.userconfig
    .get('rootdirs')
    .filter((p) => fs.existsSync(p))
    .sort()

  // walk filesystem with concurrncy limit
  await asyncTasksLimit(
    3,
    rootdirs.map((fpath) => async () => {
      await walkDirectory(fpath, filter, stats, FILEPATHS, TRIE)
    })
  )

  // write to disk
  await saveIndex(FILEPATHS, TRIE)

  // print stats
  await printStats(t0, stats)
}
