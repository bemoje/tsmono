import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { walkChildren } from './walkChildren'

export function getChildren(cmd: CommandBuilder, options?: { includeSelf?: boolean }) {
  return [...walkChildren(cmd, options)]
}
