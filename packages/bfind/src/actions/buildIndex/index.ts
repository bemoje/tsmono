import fs from 'fs-extra'
import { asyncTasksLimit } from '@bemoje/util'
import { CommandBuilder } from '@bemoje/cli'
import { createPathFilter } from './lib/createPathFilter'
import { gracefulProcessExit } from '@bemoje/commander-config'
import { IBuildIndexStats } from './lib/IBuildIndexStats'
import { printStats } from './lib/printStats'
import { saveIndex } from './lib/saveIndex'
import { TrieMap } from '@bemoje/trie-map'
import { walkDirectory } from './lib/walkDirectory'

export async function buildIndex(opts: unknown, cmd: CommandBuilder): Promise<void> {
  const config = cmd.root.db.config

  console.log(config.getAll())

  // graceful exit on error
  process.on('uncaughtException', (error: unknown) => {
    if (config.get('printScanErrors')) {
      gracefulProcessExit(error['message'] ? error['message'] : error)
    }
  })

  // data
  const t0 = Date.now()
  const FILEPATHS: string[] = []
  const TRIE = new TrieMap<Set<number>>()
  const filter = createPathFilter(cmd)
  const stats: IBuildIndexStats = {
    filesIndexed: 0,
    keywordsIndexed: 0,
    fileRefsIndexed: 0,
    fileTypes: {},
  }

  // search root
  const rootdirs = config
    .get<string[]>('rootdirs')
    .filter((p) => fs.existsSync(p))
    .sort()

  // walk filesystem with concurrncy limit
  await asyncTasksLimit(
    3,
    rootdirs.map((fpath) => async () => {
      await walkDirectory(cmd, fpath, filter, stats, FILEPATHS, TRIE)
    })
  )

  // write to disk
  await saveIndex(FILEPATHS, TRIE)

  // print stats
  await printStats(t0, stats)
}
