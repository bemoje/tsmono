import { CommandBuilder } from '../../CommandBuilder'

export function parseArguments(cmd: CommandBuilder, args: string[]) {
  const $ = cmd.$
  const last = $.registeredArguments.length - 1
  return args.map((arg, i) => {
    if (!arg) return arg
    const parse = cmd.meta.argParsers[i > last ? last : i]
    return parse ? parse(arg) : arg
  })
}
