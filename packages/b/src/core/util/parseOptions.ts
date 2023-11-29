import { assertValidOptions } from './assertValidOptions'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { OptionValues } from 'commander'

/**
 * Parses (and validates) options using the parsers defined in the command builder.
 */
export function parseOptions(cmd: CommandBuilder, opts: OptionValues) {
  opts = Object.assign({}, opts)
  // let prev = ''
  for (const [key, value] of Object.entries(opts)) {
    const parse = cmd.optParsers[key]
    opts[key] = parse ? parse(value) : value
    // console.log({ key, value, prev, parse, retval: opts[key] })
    // prev = value
  }
  assertValidOptions(cmd, opts)
  return opts
}
