import { getOptionArgumentName } from './getOptionArgumentName'
import { Option } from 'commander'

/**
 * Update an Option's 'flags' property from its 'short' and 'long' properties.
 * The flags property is not automatically updated when 'short' or 'long' are changed.
 */
export function renderOptionFlags(opt: Option) {
  const shortLong = []
  if (opt.short) shortLong.push(opt.short)
  if (opt.long) shortLong.push(opt.long)
  const argName = getOptionArgumentName(opt)
  return shortLong.join(', ') + (argName ? ' ' + argName : '')
}
