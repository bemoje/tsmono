import globToRegexp from 'glob-to-regexp'
import path from 'path'
import { config } from '../core/config'

export function globToRegex(glob: string): RegExp {
  const regex = globToRegexp(glob.replace(/(\\|\/)+/g, path.sep))
  const insensitive = config.userconfig.get('case-insensitive')
  return new RegExp(regex.source, insensitive ? 'i' : '')
}
