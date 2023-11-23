import { Command, Option } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getOptionNames } from './getOptionNames'

/**
 * Asserts option's 'short', 'long' and 'attributeName' are not already taken by other own or global options.
 * @throws If any of the names are already taken.
 */
export function assertOptionNameAvailable(cmd: CommandBuilder, opt: Option) {
  const optionNames = getOptionNames(cmd, { short: true, long: true, attributeName: true })
  if (opt.short && optionNames.has(opt.short)) {
    throw new Error(`Option 'short' name already taken: ${opt.short}`)
  }
  if (opt.long && optionNames.has(opt.long)) {
    throw new Error(`Option 'long' name already taken: ${opt.short}`)
  }
  if (opt.attributeName() && optionNames.has(opt.attributeName())) {
    throw new Error(`Option 'attributeName' name already taken: ${opt.short}`)
  }
}
