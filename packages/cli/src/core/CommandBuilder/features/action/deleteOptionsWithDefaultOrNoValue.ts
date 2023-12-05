import { CommandBuilder } from '../../CommandBuilder'
import { getOwnAndGlobalOptions } from '../../getOwnAndGlobalOptions'
import { OptionValues } from 'commander'

export function deleteOptionsWithDefaultOrNoValue(cmd: CommandBuilder, opts: OptionValues) {
  const names = new Set(getOwnAndGlobalOptions(cmd).map((o) => o.attributeName()))
  for (const [key, value] of Object.entries(opts)) {
    if (!names.has(key) || value === false || value == null) {
      delete opts[key]
    }
  }
  return opts
}
