import { colors } from '@bemoje/util'
import fs from 'fs'
import { words } from 'lodash'
import { config } from './config'
const { cyan, gray, red, yellow } = colors

export async function printSearchResult(fspaths: string[], search: string, printAll = false) {
  const origLen = fspaths.length
  let pathstat: [fs.Stats, string][]
  for (const fspath of fspaths) {
    if (fs.existsSync(fspath)) {
      try {
        pathstat.push([await fs.promises.stat(fspath), fspath])
      } catch (error) {
        continue
      }
    }
  }
  pathstat.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  if (!printAll && fspaths.length > config.appdata.user.get('max-results')) {
    pathstat = pathstat.slice(pathstat.length - config.appdata.user.get('max-results'))
  }

  console.log()
  const keywords = words(search)
  for (let i = 0; i < pathstat.length; i++) {
    const stat = pathstat[i][0]
    const fspath = keywords.reduce((p: string, kw: string) => {
      return p.replace(new RegExp(kw, 'gi'), red(kw))
    }, pathstat[i][1])
    const daysOld = Math.floor((new Date().getTime() - stat.mtimeMs) / 1000 / 60 / 60 / 24)

    if (stat.isDirectory()) {
      console.log(cyan(fspath) + gray(' (' + daysOld + ' days)'))
    } else {
      console.log(fspath + gray(' (' + daysOld + ' days)'))
    }
  }
  if (!printAll && origLen > config.appdata.user.get('max-results')) {
    console.log(yellow((origLen - config.appdata.user.get('max-results')).toString() + ' results not shown.'))
  }
  console.log()
}
