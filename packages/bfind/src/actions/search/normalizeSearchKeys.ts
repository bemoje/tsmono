import { arrLast, arrMapMutable } from '@bemoje/util'
import { normalizeKeys } from '../../util/normalizeKeys'
import { normalizePathSep } from '../../util/normalizePathSep'

export function normalizeSearchKeys(keys: string[]): Set<string> {
  arrMapMutable(keys, normalizePathSep)
  const isDir = !arrLast(arrLast(keys).split('/')).includes('.')
  return normalizeKeys(keys.join(' '), isDir)
}
