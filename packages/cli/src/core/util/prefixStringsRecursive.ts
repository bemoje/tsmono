import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixString } from './prefixString'
import { walkChildren } from './walkChildren'

/**
 * Returns a command's and its children's prefix strings.
 */
export function prefixStringsRecursive(cmd: CommandBuilder, filter?: (prefix: string, cmd: CommandBuilder) => boolean) {
  const result: string[][] = []
  for (const c of walkChildren(cmd, { includeSelf: true })) {
    const prefix = prefixString(c)
    if (filter && !filter(prefix, c)) continue
    result.push([prefix, c.get.summary])
  }
  return result
}
