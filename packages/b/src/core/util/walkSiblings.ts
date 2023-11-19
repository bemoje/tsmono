import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Iterate sibling CommandBuilder objects.
 */
export function* walkSiblings(cmd: CommandBuilder) {
  if (!cmd.parent) return
  for (const sub of cmd.parent.subcommands) {
    if (sub === cmd) continue
    yield sub
  }
}
