import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getAncestors } from './getAncestors'

/**
 * Get a commands prefix array based on all its parent/ancestor commands.
 */
export function prefixArray(cmd: CommandBuilder): string[] {
  return getAncestors(cmd, { includeSelf: true })
    .reverse()
    .map((node) => node.name)
}
