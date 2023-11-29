import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function parseArguments(cb: CommandBuilder, args: string[]) {
  const lastIndex = cb.$.registeredArguments.length - 1
  return args.map((arg, i) => {
    if (!arg) return arg
    // const prev = i === 0 ? null : arr[i - 1]
    const parserIndex = i > lastIndex ? lastIndex : i
    const parse = cb.argParsers[parserIndex]
    const retval = parse ? parse(arg) : arg
    return retval
  })
}
