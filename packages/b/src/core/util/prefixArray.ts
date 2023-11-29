import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getAncestors } from './getAncestors'

/**
 * Get a commands prefix array based on all its parent/ancestor commands.
 */
export function prefixArray(cmd: CommandBuilder): string[] {
  const cached = wm.get(cmd)
  if (cached) return cached
  const result = getAncestors(cmd, { includeSelf: true })
    .reverse()
    .map((node) => {
      return node.$.name()
    })
  wm.set(cmd, result)
  return result
}

const wm = new WeakMap<CommandBuilder, string[]>()
