import { autoAssignSubCommandAliases } from './autoAssignSubCommandAliases'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { forEachChildRecursive } from './forEachChildRecursive'

export function autoAssignSubCommandAliasesRecursive(cb: CommandBuilder) {
  if (!cb.parent) forEachChildRecursive(cb, autoAssignSubCommandAliases, { includeSelf: true })
}
