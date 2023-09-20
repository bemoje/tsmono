import { FSPathFilter } from '@bemoje/util'
import { config } from '../../core/config'
import { normalizePathSep } from '../../util/normalizePathSep'

export function createPathFilter(): FSPathFilter {
  const filter = new FSPathFilter()
  filter.isCaseInsensitive = config.userconfig.get('case-insensitive')

  config.userconfig.get('ignore-dirpaths').forEach((reg: string) => {
    const regex = new RegExp(reg, filter.isCaseInsensitive ? 'i' : '')
    // console.log(regex)
    filter.ignoreDirpathRegex(regex)
  })

  config.userconfig.get('ignore-filepaths').forEach((reg: string) => {
    const regex = new RegExp(reg, filter.isCaseInsensitive ? 'i' : '')
    filter.ignoreFilepathRegex(regex)
  })

  const extensions = config.userconfig.get('ignore-file-extensions')
  filter.ignoreFilepathRegex(new RegExp('\\.(' + extensions.join('|') + ')$', 'i'))

  if (config.userconfig.get('print-scan-ignored')) {
    filter.on('invalid', (type, fspath) => {
      console.log(`Ignored ${type}: ${normalizePathSep(fspath)}`)
    })
  }
  return filter
}

// const test = (string: string) => {
//   console.log()
//   console.log(string)
//   console.log(new RegExp(string))
// }

// test('\\..ts$')
