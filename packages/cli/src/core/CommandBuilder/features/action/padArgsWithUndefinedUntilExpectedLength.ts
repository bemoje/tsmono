import { Any } from '@bemoje/util'
import { CommandBuilder } from '../../CommandBuilder'

export function padArgsWithUndefinedUntilExpectedLength(cmd: CommandBuilder, args: Any[]) {
  while (args.length < cmd.arguments.length) args.push(undefined)
  return args
}
