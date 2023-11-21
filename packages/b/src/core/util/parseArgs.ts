import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function parseArgs(cb: CommandBuilder, args: string[]) {
  return args.map((arg, i) => {
    const lastIndex = cb.$.registeredArguments.length - 1
    const prev = i === 0 ? '' : cb.$.args[i - 1]
    const parserIndex = i > lastIndex ? lastIndex : i
    const parse = cb.argParsers[parserIndex]
    if (typeof parse !== 'function') return arg
    const retval = parse(arg, prev)
    return retval
  })
}
