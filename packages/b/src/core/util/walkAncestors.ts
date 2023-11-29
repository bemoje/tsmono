import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Returns an iterator that walks the command's ancestors, optionally starting with the command itself.
 */
export function* walkAncestors(cmd: CommandBuilder, options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
  if (options?.includeSelf) yield cmd
  let node = cmd.parent
  while (node) {
    yield node
    node = node.parent
  }
}
