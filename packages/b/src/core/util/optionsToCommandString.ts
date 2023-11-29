import { Command, OptionValues } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { escapeShellCommandArgument } from './escapeShellCommandArgument'
import { walkAncestors } from './walkAncestors'

/**
 * Convert an options object to its command-string form.
 * @example {bool:true, str:'text'} => ['--bool', '--str=text']
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
