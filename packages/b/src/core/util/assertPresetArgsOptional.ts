import { Any } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function assertPresetArgsOptional(cmd: CommandBuilder, args: Any[]) {
  args.forEach((arg, i) => {
    if (arg != null && i < cmd.arguments.length && cmd.arguments[i].required) {
      throw new Error(`Cannot preset required arguments.`)
    }
  })
}
