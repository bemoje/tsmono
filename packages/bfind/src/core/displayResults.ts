import { colors, Timer } from '@bemoje/util'
import fs from 'fs'
import { config } from './config'
const { cyan, gray, red, yellow } = colors

export async function displayResults(fspaths: string[], keywords: Set<string>, printAll = false) {
  const statTimer = new Timer('Stat')
  let stats: [fs.Stats, string][] = []
  for (const fspath of fspaths) {
    try {
      stats.push([await fs.promises.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  statTimer.print()

  const sortTimer = new Timer('Sort')
  stats.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  sortTimer.print()

  const printTimer = new Timer('Print')
  const maxResults = config.userconfig.get('max-results')
  if (!printAll && fspaths.length > maxResults) {
    stats = stats.slice(stats.length - maxResults)
  }
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i][0]
    const fspath = [...keywords].reduce((p: string, kw: string) => {
      return p.replace(new RegExp(kw, 'gi'), red(kw))
    }, stats[i][1])
    const sinceModified = Math.floor((new Date().getTime() - stat.mtimeMs) / 1000 / 60 / 60 / 24)
    if (stat.isDirectory()) {
      console.log(cyan(fspath) + gray(' (' + sinceModified + ' days)'))
    } else {
      console.log(fspath + gray(' (' + sinceModified + ' days)'))
    }
  }
  if (!printAll && fspaths.length > maxResults) {
    console.log(yellow((fspaths.length - maxResults).toString() + ' results not shown.'))
  }
  printTimer.print()
}
