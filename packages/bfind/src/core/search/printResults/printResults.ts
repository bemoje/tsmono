import { config } from '../../config'
import { appendLastModified } from './appendLastModified'
import { colorMatchingParts } from './colorMatchingParts'
import { printIndexAge } from './printIndexAge'
import { printTrimAmount } from './printTrimAmount'
import { sortByLastModified } from './sortByLastModified'

export async function printResults(filepaths: string[], keywords: Set<string>, options: { printAllResults?: boolean }) {
  const printAllResults = options.printAllResults || filepaths.length <= config.userconfig.get('max-results')
  const statsPaths = await sortByLastModified(filepaths, printAllResults)
  for (const [stat, fpath] of statsPaths) {
    const filepath = colorMatchingParts(fpath, keywords)
    console.log(appendLastModified(stat, filepath))
  }
  printTrimAmount(filepaths, printAllResults)
  printIndexAge()
}
