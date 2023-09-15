import { colors, Timer } from '@bemoje/util'
import fs from 'fs'
import { config } from './config'
const { cyan, gray, red, yellow } = colors

export async function printSearchResult(fspaths: string[], keywords: Set<string>, printAll = false) {
  const tstat = new Timer()
  let pathstat: [fs.Stats, string][] = []
  for (const fspath of fspaths) {
    try {
      pathstat.push([await fs.promises.stat(fspath), fspath])
    } catch (error) {
      continue
    }
  }
  console.log('Stat: ' + tstat.toString())

  const tsort = new Timer()
  pathstat.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  console.log('Sort: ' + tsort.toString())

  const tprint = new Timer()
  const maxResults = config.userconfig.get('max-results')
  if (!printAll && fspaths.length > maxResults) {
    pathstat = pathstat.slice(pathstat.length - maxResults)
  }
  for (let i = 0; i < pathstat.length; i++) {
    const stat = pathstat[i][0]
    const fspath = [...keywords].reduce((p: string, kw: string) => {
      return p.replace(new RegExp(kw, 'gi'), red(kw))
    }, pathstat[i][1])
    const daysOld = Math.floor((new Date().getTime() - stat.mtimeMs) / 1000 / 60 / 60 / 24)
    if (stat.isDirectory()) {
      console.log(cyan(fspath) + gray(' (' + daysOld + ' days)'))
    } else {
      console.log(fspath + gray(' (' + daysOld + ' days)'))
    }
  }
  if (!printAll && fspaths.length > maxResults) {
    console.log(yellow((fspaths.length - maxResults).toString() + ' results not shown.'))
  }
  console.log('Print: ' + tprint.toString())
}
