import { FSPathFilter } from '@bemoje/util'
import { normalizePathSep } from '../../util/normalizePathSep'
import { config } from '../config'

export function createPathFilter(): FSPathFilter {
  const filter = new FSPathFilter()
  filter.isCaseInsensitive = config.userconfig.get('case-insensitive')
  config.userconfig.get('ignore').forEach((reg: string) => {
    const regex = new RegExp(normalizePathSep(reg), filter.isCaseInsensitive ? 'i' : '')
    console.log(regex.toString())
    filter.ignoreDirpathRegex(regex)
  })
  config.userconfig.get('ignore-files').forEach((regex: string) => {
    filter.ignoreFilepathRegex(new RegExp(normalizePathSep(regex), filter.isCaseInsensitive ? 'i' : ''))
  })
  if (config.userconfig.get('print-scan-ignored')) {
    filter.on('invalid', (type, fspath) => {
      console.log(`Ignored ${type}: ${fspath}`)
    })
  }
  return filter
}
