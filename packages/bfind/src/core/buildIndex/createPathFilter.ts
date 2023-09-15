import { FSPathFilter } from '@bemoje/util'
import path from 'path'
import { config } from '../config'

export function createPathFilter(): FSPathFilter {
  const filter = new FSPathFilter()
  filter.isCaseInsensitive = true
  config.userconfig.get('ignore').forEach((reg: string) => {
    filter.ignoreDirpathRegex(new RegExp(reg.replace(/\/|\\/g, path.sep), 'i'))
  })
  if (config.userconfig.get('print-scan-ignored')) {
    filter.on('invalid', (type, fspath) => {
      console.log(`Ignored ${type}: ${fspath}`)
    })
  }
  return filter
}
