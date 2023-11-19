import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getAncestors } from './getAncestors'

/**
 * Get a commands prefix array based on all its parent/ancestor commands.
 */
export function prefixArray(cmd: Command | CommandBuilder): string[] {
  return getAncestors(cmd, { includeSelf: true })
    .reverse()
    .map((node) => {
      return node instanceof Command ? node.name() : node.$.name()
    })
}
