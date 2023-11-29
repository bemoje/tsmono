import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Returns whether a command's last argument is variadic.
 */
export function hasVariadicArguments(cmd: CommandBuilder) {
  if (!cmd.arguments.length) return false
  const args = cmd.arguments
  const lastArg = args[args.length - 1]
  const isVariadic = lastArg.variadic
  return isVariadic
}
