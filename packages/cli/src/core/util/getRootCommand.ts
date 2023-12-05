import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getAncestors } from './getAncestors'

/**
 * Get the command at the root of the command tree.
 */

export function getRootCommand(cmd: CommandBuilder) {
  if (cmd.isRoot) return cmd
  return getAncestors(cmd).pop() as CommandBuilder
}
