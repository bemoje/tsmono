import { strToWords } from '@bemoje/node-util'
import { blackBright, cyan, red, yellow } from 'cli-color'
import fs from 'fs'
import { config } from '../index'

export async function printSearchResult(fspaths: string[], search: string, printAll = false) {
  const origLen = fspaths.length
  let pathstat: [fs.Stats, string][] = await Promise.all(
    fspaths.map(async (fspath) => {
      return [await fs.promises.stat(fspath), fspath]
    }),
  )
  pathstat.sort((a, b) => a[0].mtimeMs - b[0].mtimeMs)
  if (!printAll && fspaths.length > config.settings['max-results']) {
    pathstat = pathstat.slice(pathstat.length - config.settings['max-results'])
  }

  console.log()
  const keywords = strToWords(search)
  for (let i = 0; i < pathstat.length; i++) {
    const stat = pathstat[i][0]
    const fspath = keywords.reduce((p: string, kw: string) => {
      return p.replace(new RegExp(kw, 'gi'), red(kw))
    }, pathstat[i][1])
    const daysOld = Math.floor((new Date().getTime() - stat.mtimeMs) / 1000 / 60 / 60 / 24)

    if (stat.isDirectory()) {
      console.log(cyan(fspath) + blackBright(' (' + daysOld + ' days)'))
    } else {
      console.log(fspath + blackBright(' (' + daysOld + ' days)'))
    }
  }
  if (!printAll && origLen > config.settings['max-results']) {
    console.log(yellow((origLen - config.settings['max-results']).toString() + ' results not shown.'))
  }
  console.log()
}
