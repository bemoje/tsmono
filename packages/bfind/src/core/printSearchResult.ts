import { colors, Timer } from '@bemoje/util'
import fs from 'fs'
import { config } from './config'
const { cyan, gray, red, yellow } = colors

export async function printSearchResult(fspaths: string[], keywords: Set<string>, printAll = false) {
  const tstat = new Timer('Stat')
  let pathstat: [fs.Stats, string][] = []
  for (const fspath of fspaths) {
    try {
      pathstat.push([await fs.promises.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  tstat.print()

  const tsort = new Timer('Sort')
  pathstat.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  tsort.print()

  const tprint = new Timer('Print')
  const maxResults = config.userconfig.get('max-results')
  if (!printAll && fspaths.length > maxResults) {
    pathstat = pathstat.slice(pathstat.length - maxResults)
  }
  for (let i = 0; i < pathstat.length; i++) {
    const stat = pathstat[i][0]
    const fspath = [...keywords].reduce((p: string, kw: string) => {
      return p.replace(new RegExp(kw, 'gi'), red(kw))
    }, pathstat[i][1])
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
  tprint.print()
}
