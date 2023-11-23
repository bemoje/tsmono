import { Option } from 'commander'
import { renderOptionFlags } from './renderOptionFlags'
import { strEnsureStartsWith } from '@bemoje/util'

/**
 * Set an Option's 'short' name. The 'flags' property is updated accordingly.
 * The '-' prefix is automatically added if not present.
 */
export function setOptionShortName(opt: Option, short: string) {
  opt.short = strEnsureStartsWith(short, '-').replace(/^-+/, '-')
  opt.flags = renderOptionFlags(opt)
}
