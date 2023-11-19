import { Option } from 'commander'
import { updateOptionFlags } from './updateOptionFlags'

/**
 * Set an Option's 'long' name.
 */
export function setOptionLongName(opt: Option, long: string) {
  if (!long.startsWith('--')) long = '--' + long
  opt.long = long
  updateOptionFlags(opt)
}
