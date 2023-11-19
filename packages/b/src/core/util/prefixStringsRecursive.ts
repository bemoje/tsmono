import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixString } from './prefixString'
import { walkChildren } from './forEachChildRecursive'

/**
 * Returns a command's and its children's prefix strings.
 */
export function prefixStringsRecursive(cmd: CommandBuilder): string[] {
  const result: string[] = []
  for (const c of walkChildren(cmd, { includeSelf: true })) {
    result.push(prefixString(c))
  }
  return result
}
