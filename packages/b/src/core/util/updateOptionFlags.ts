import { getOptionArgumentName } from './getOptionArgumentName'
import { Option } from 'commander'

/**
 * Update an Option's 'flags' property from its 'short' and 'long' properties.
 * The flags property is not automatically updated when 'short' or 'long' are changed.
 */
export function updateOptionFlags(opt: Option) {
  const argName = getOptionArgumentName(opt)
  opt.flags = opt.short + ', ' + opt.long + (argName ? ' ' + argName : '')
}
