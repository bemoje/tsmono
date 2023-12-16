import { CommandBuilder } from '@bemoje/cli'
import { FSPathFilter, normalizeFileExtension } from '@bemoje/util'
import { normalizePathSep } from '../../../util/lib/normalizePathSep'

export function createPathFilter(cmd: CommandBuilder): FSPathFilter {
  const config = cmd.root.db.config

  const filter = new FSPathFilter()
  filter.isCaseInsensitive = config.get('caseInsensitive')

  config.get<string[]>('ignoreDirpaths').forEach((reg: string) => {
    const regex = new RegExp(reg, filter.isCaseInsensitive ? 'i' : '')
    filter.ignoreDirpathRegex(regex)
  })

  config.get<string[]>('ignoreFilepaths').forEach((reg: string) => {
    const regex = new RegExp(reg, filter.isCaseInsensitive ? 'i' : '')
    filter.ignoreFilepathRegex(regex)
  })

  const extensions = config
    .get<string[]>('ignoreFileExtensions')
    .map(normalizeFileExtension)
    .filter((ext) => ext.length > 1)
    .map((ext) => ext.slice(1))
    .sort()
    .join('|')
  const regex = new RegExp('\\.(' + extensions + ')$', 'i')
  filter.ignoreFilenameRegex(regex)

  if (config.get('printScanIgnored')) {
    filter.on('invalid', (type, fspath) => {
      console.log(`Ignored ${type}: ${normalizePathSep(fspath)}`)
    })
  }
  return filter
}
