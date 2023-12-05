import { CommandBuilder } from './CommandBuilder'
import { getGlobalOptions } from './getGlobalOptions'
import { Option } from 'commander'

export function getOwnAndGlobalOptions(cmd: CommandBuilder): Option[] {
  return cmd.options.concat(getGlobalOptions(cmd))
}
