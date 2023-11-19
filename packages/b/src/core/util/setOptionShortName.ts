import { Option } from 'commander'
import { updateOptionFlags } from './updateOptionFlags'

/**
 * Set an Option's 'short' name.
 */
export function setOptionShortName(opt: Option, short: string) {
  if (!short.startsWith('-')) short = '-' + short
  opt.short = short
  updateOptionFlags(opt)
}
