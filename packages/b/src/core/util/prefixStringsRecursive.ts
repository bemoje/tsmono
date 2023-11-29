import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixString } from './prefixString'
import { walkChildren } from './walkChildren'

/**
 * Returns a command's and its children's prefix strings.
 */
export function prefixStringsRecursive(cmd: CommandBuilder, filter?: (prefix: string, cmd: CommandBuilder) => boolean) {
  const result: string[][] = []
  for (const o of walkChildren(cmd, { includeSelf: true })) {
    const prefix = prefixString(o)
    if (filter && !filter(prefix, o)) continue
    result.push([prefix, o.$.summary()])
  }
  return result
}
