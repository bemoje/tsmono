import path from 'path'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { prefixArray } from './prefixArray'

export function getJsonFilepath(cmd: CommandBuilder) {
  return path.join(CommandBuilder.dataDirectory, prefixArray(cmd).join('-')) + '.json'
}
