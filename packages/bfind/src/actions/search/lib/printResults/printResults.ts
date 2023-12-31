import { appendLastModified } from './appendLastModified'
import { colorMatchingParts } from './colorMatchingParts'
import { CommandBuilder } from '@bemoje/cli'
import { isWindows } from '@bemoje/util'
import { printIndexAge } from './printIndexAge'
import { printTrimAmount } from './printTrimAmount'
import { sortByLastModified } from './sortByLastModified'

export async function printResults(cmd: CommandBuilder, filepaths: string[], keywords: string[]) {
  const _filepaths = filepaths.slice()
  if (filepaths.length > 5000) {
    filepaths = filepaths.slice(0, 5000)
  }
  const statsPaths = await sortByLastModified(cmd, filepaths)
  for (const [stat, fpath] of statsPaths) {
    const filepath = colorMatchingParts(fpath, keywords)
    const out = appendLastModified(stat, filepath)
    console.log(isWindows() ? out.replace(/\//g, '\\') : out)
  }
  printTrimAmount(cmd, _filepaths)
  printIndexAge()
}
