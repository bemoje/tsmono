import { arrLast } from '@bemoje/util'
import path from 'path'
import { normalizePathSep } from '../../util/normalizePathSep'
import { normalizeKeys } from '../normalizeKeys'

export function normalizeSearchKeys(keys: string[]): Set<string> {
  keys = keys.map(normalizePathSep)
  const isDir = !arrLast(arrLast(keys).split(path.sep)).includes('.')
  return normalizeKeys(keys.join(' '), isDir)
}
