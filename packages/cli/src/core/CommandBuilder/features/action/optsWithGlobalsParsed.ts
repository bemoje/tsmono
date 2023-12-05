import { CommandBuilder } from '../../CommandBuilder'
import { parseOptions } from './parseOptions'

export function optsWithGlobalsParsed(cmd: CommandBuilder) {
  const $ = cmd.$
  return parseOptions(cmd, $.optsWithGlobals())
}
