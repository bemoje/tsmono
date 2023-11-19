import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { walkSiblings } from './walkSiblings'

/**
 * Returns an array of sibling CommandBuilder objects.
 */
export function getSiblings(cmd: CommandBuilder) {
  return [...walkSiblings(cmd)]
}
