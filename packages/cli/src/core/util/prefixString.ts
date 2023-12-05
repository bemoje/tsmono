import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixArray } from './prefixArray'

/**
 * Get a commands prefix string based on all its parent/ancestor commands.
 */
export function prefixString(cmd: CommandBuilder) {
  return prefixArray(cmd).join(' ')
}
