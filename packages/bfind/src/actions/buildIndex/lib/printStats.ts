import { getIndexSize } from './getIndexSize'
import { IBuildIndexStats } from './IBuildIndexStats'
import { MS_IN_SECOND, round } from '@bemoje/util'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  const entries = Object.entries(stats.fileTypes).sort((a, b) => b[1] - a[1])
  const index = entries.findIndex((e) => e[1] < 800)
  const entriesTop = entries.splice(0, index)
  entriesTop.push(['OTHER-TYPES', entries.reduce((acc, e) => acc + e[1], 0)])
  delete stats.fileTypes
  console.log({
    fileTypes: Object.fromEntries(entriesTop),
    ...stats,
    indexSizeMB: await getIndexSize(),
    completedInSeconds: round((Date.now() - t0) / MS_IN_SECOND),
  })
}
