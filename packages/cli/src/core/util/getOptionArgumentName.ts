import { arrLast } from '@bemoje/util'
import { Option } from 'commander'

/**
 * Extract the argument name from an option's 'flags' string.
 */
export function getOptionArgumentName(opt: Option) {
  const result = arrLast(opt.flags.trim().split(' '))
  if (/-/.test(result)) return undefined
  return result
}
