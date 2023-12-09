import { arrLast } from '@bemoje/util'
import { Option } from 'commander'
import { strEnsureStartsWith } from '@bemoje/util'

/**
 * Extract the argument name from an option's 'flags' string.
 */
function getArgumentName(opt: Option) {
  const result = arrLast(opt.flags.trim().split(' '))
  if (/-/.test(result)) return undefined
  return result
}

/**
 * Check if an option has an argument.
 */
function hasArgument(opt: Option) {
  return /[<>[\]]/.test(opt.flags)
}

/**
 * Update an Option's 'flags' property from its 'short' and 'long' properties.
 * The flags property is not automatically updated when 'short' or 'long' are changed.
 */
function renderFlags(opt: Option) {
  const shortLong = []
  if (opt.short) shortLong.push(opt.short)
  if (opt.long) shortLong.push(opt.long)
  const argName = getArgumentName(opt)
  return shortLong.join(', ') + (argName ? ' ' + argName : '')
}

/**
 * Set an Option's 'long' name. The 'flags' property is updated accordingly.
 * The '--' prefix is automatically added if not present.
 */
function setLong(opt: Option, long: string) {
  opt.long = strEnsureStartsWith(long, '--').replace(/^-+/, '--')
  opt.flags = renderFlags(opt)
}

/**
 * Set an Option's 'short' name. The 'flags' property is updated accordingly.
 * The '-' prefix is automatically added if not present.
 */
function setShort(opt: Option, short: string) {
  opt.short = strEnsureStartsWith(short, '-').replace(/^-+/, '-')
  opt.flags = renderFlags(opt)
}

export const optionUtils = {
  getArgumentName,
  hasArgument,
  renderFlags,
  setLong,
  setShort,
}
