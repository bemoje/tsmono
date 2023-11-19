import { Command } from 'commander'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * In the usage string, move `[options]` to the end, indicating that options are to be specified after arguments.
 */
export function optionsLastInUsage(cmd: Command | CommandBuilder) {
  let str = cmd instanceof Command ? cmd.usage() : cmd.$.usage()
  if (str.includes('[options]')) {
    str = str.replace(' [options]', '')
    str = str.replace('[options] ', '')
    str += ' [options]'
  }
  cmd.usage(str)
}
