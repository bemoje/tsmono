import { Command, OptionValues } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { escapeShellCommandArgument } from './escapeShellCommandArgument'
import { strSplitCamelCase } from '@bemoje/util'
import { TPresetDefaultOptions } from '../../cli/bFindIn/lib/core/preset/IPreset'
import { walkAncestors } from './walkAncestors'

/**
 * Convert an options object to its command-string form.
 * @example {bool:true, str:'text'} => ['-bool', '--str=text']
 */
export function optionsToCommandString(cmd: Command | CommandBuilder, options: OptionValues): string[] {
  const bools: string[] = []
  const opts: string[] = []
  for (const [key, value] of Object.entries(options)) {
    for (const ancestor of walkAncestors(cmd, { includeSelf: true })) {
      for (const opt of ancestor.options) {
        if (key === opt.attributeName()) {
          const long = opt.long || '--' + opt.name()
          if (typeof value === 'boolean') {
            if (value === true) bools.push(long)
          } else {
            opts.push(long + '=' + escapeShellCommandArgument(value))
          }
        }
      }
    }
  }
  return [...bools, ...opts]
}

export function optionsToCommandString_old(options: TPresetDefaultOptions): string[] {
  const bools: string[] = []
  const opts: string[] = []
  for (let [key, value] of Object.entries(options)) {
    key = '--' + strSplitCamelCase(key).join('-').trim().toLowerCase()
    if (typeof value === 'boolean') {
      if (value === true) bools.push(key)
    } else {
      value = key + '=' + value
      opts.push(value)
    }
  }
  return [...bools, ...opts]
}
