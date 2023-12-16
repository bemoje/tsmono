import { arrLast, arrMapMutable } from '@bemoje/util'
import { CommandBuilder } from '@bemoje/cli'
import { normalizeKeys } from '../../../util/lib/normalizeKeys'
import { normalizePathSep } from '../../../util/lib/normalizePathSep'

export function normalizeSearchKeys(cmd: CommandBuilder, keys: string[]): Set<string> {
  arrMapMutable(keys, normalizePathSep)
  const isDir = !arrLast(arrLast(keys).split('/')).includes('.')
  return normalizeKeys(cmd, keys.join(' '), isDir)
}
