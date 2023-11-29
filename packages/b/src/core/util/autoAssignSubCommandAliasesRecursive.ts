import { autoAssignSubCommandAliases } from './autoAssignSubCommandAliases'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { forEachChildRecursive } from './forEachChildRecursive'

export function autoAssignSubCommandAliasesRecursive(cmd: CommandBuilder) {
  if (cmd.isRoot) forEachChildRecursive(cmd, autoAssignSubCommandAliases, { includeSelf: true })
}
