import { CommandBuilder } from './CommandBuilder'
import { getAncestors } from '../util/getAncestors'
import { Option } from 'commander'

export function getGlobalOptions(cmd: CommandBuilder): Option[] {
  const result: Option[] = []
  const ancestors = getAncestors(cmd, { includeSelf: true }).reverse()
  for (const anc of ancestors) {
    for (const gopt of anc.meta.globalOptions) {
      if (!cmd.meta.hiddenGlobalOptions.has(gopt)) {
        result.push(gopt)
      }
    }
  }
  return result
}
