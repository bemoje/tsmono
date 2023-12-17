import { getIndexSize } from './getIndexSize'
import { IBuildIndexStats } from './IBuildIndexStats'
import { MS_IN_SECOND, round } from '@bemoje/util'

export async function printStats(t0: number, stats: IBuildIndexStats): Promise<void> {
  const entries = Object.entries(stats.fileTypes).sort((a, b) => b[1] - a[1])
  const entriesTop = entries.splice(0, 10)
  entriesTop.push(['OTHER-TYPES', entries.reduce((acc, e) => acc + e[1], 0)])
  Reflect.deleteProperty(stats, 'fileTypes')
  console.log({
    ...(stats as Partial<IBuildIndexStats>),
    indexSizeMB: await getIndexSize(),
    completedInSeconds: round((Date.now() - t0) / MS_IN_SECOND),
    fileTypesTop10: Object.fromEntries(entriesTop),
  })
}
