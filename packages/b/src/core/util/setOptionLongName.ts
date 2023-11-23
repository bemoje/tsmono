import { Option } from 'commander'
import { renderOptionFlags } from './renderOptionFlags'
import { strEnsureStartsWith } from '@bemoje/util'

/**
 * Set an Option's 'long' name. The 'flags' property is updated accordingly.
 * The '--' prefix is automatically added if not present.
 */
export function setOptionLongName(opt: Option, long: string) {
  opt.long = strEnsureStartsWith(long, '--').replace(/^-+/, '--')
  opt.flags = renderOptionFlags(opt)
}
