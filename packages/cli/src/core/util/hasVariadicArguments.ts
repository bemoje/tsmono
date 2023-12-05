import { Argument } from 'commander'
import { arrLast } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Returns whether a command's last argument is variadic.
 */
export function hasVariadicArguments(cmd: CommandBuilder) {
  if (!cmd.arguments.length) return false
  return arrLast(cmd.arguments as Argument[]).variadic
}
