import { globToRegex } from '../../../util/globToRegex'
import { normalizePathSep } from '../../../util/normalizePathSep'
import { config } from '../../config'
import { ISearchOptions } from '../ISearchOptions'
import { appendLastModified } from './appendLastModified'
import { colorMatchingParts } from './colorMatchingParts'
import { printIndexAge } from './printIndexAge'
import { printTrimAmount } from './printTrimAmount'
import { sortByLastModified } from './sortByLastModified'

export async function printResults(filepaths: string[], keywords: Set<string>, options: ISearchOptions) {
  if (options.ignore) {
    const regex = globToRegex(normalizePathSep(options.ignore))
    filepaths = filepaths.filter((p) => !regex.test(p))
  }
  if (options.include) {
    const regex = globToRegex(normalizePathSep(options.include))
    filepaths = filepaths.filter((p) => regex.test(p))
  }
  if (options.printAllResults || filepaths.length <= config.userconfig.get('max-results')) {
    options.printAllResults = true
  }
  const statsPaths = await sortByLastModified(filepaths, options.printAllResults)
  for (const [stat, fpath] of statsPaths) {
    const filepath = colorMatchingParts(fpath, keywords)
    console.log(appendLastModified(stat, filepath))
  }
  printTrimAmount(filepaths, options.printAllResults)
  printIndexAge()
}
