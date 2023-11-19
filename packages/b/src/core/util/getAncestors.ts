import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { walkAncestors } from './walkAncestors'

/**
 * Get a command's ancestors, optionally starting from the command itself.
 */
export function getAncestors<C extends Command | CommandBuilder>(cmd: C, options?: { includeSelf?: boolean }) {
  return [...walkAncestors<C>(cmd, options)]
}
