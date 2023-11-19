import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Returns an iterator that walks the command's ancestors, optionally starting with the command itself.
 */
export function* walkAncestors<C extends Command | CommandBuilder>(
  cmd: C,
  options?: { includeSelf?: boolean }
): Generator<C> {
  if (options?.includeSelf) yield cmd
  let node = cmd.parent as C
  while (node) {
    yield node
    node = node.parent as C
  }
}
