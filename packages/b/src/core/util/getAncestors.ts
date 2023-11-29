import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { walkAncestors } from './walkAncestors'

/**
 * Get a command's ancestors, optionally starting from the command itself.
 */
export function getAncestors(cmd: CommandBuilder, options?: { includeSelf?: boolean }) {
  return [...walkAncestors(cmd, options)]
}
