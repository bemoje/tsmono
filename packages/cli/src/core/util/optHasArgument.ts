import { Option } from 'commander'

export function optHasArgument(opt: Option) {
  return /[<>[\]]/.test(opt.flags)
}
