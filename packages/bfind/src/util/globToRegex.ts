import globToRegexp from 'glob-to-regexp'
import { config } from '../core/config'
import { normalizePathSep } from './normalizePathSep'

export function globToRegex(glob: string): RegExp {
  const regex = globToRegexp(normalizePathSep(glob), { extended: true })
  const insensitive = config.userconfig.get('case-insensitive')
  return new RegExp(regex.source, insensitive ? 'i' : '')
}
