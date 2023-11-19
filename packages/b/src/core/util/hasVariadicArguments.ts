import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Returns whether a command's last argument is variadic.
 */
export function hasVariadicArguments(cmd: CommandBuilder | Command) {
  if (!cmd.registeredArguments.length) return false
  const args = cmd.registeredArguments
  const lastArg = args[args.length - 1]
  const isVariadic = lastArg.variadic
  return isVariadic
}
