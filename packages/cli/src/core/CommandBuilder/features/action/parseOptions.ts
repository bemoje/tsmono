import { CommandBuilder } from '../../CommandBuilder'
import { OptionValues } from 'commander'

/**
 * Parses (and validates) options using the parsers defined in the command builder.
 */
export function parseOptions(cmd: CommandBuilder, opts: OptionValues) {
  for (const [key, value] of Object.entries(opts)) {
    const parse = cmd.meta.optParsers[key]
    opts[key] = parse ? parse(value) : value
  }
  return opts
}
