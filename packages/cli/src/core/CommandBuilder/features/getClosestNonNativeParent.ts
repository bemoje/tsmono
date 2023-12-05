import { CommandBuilder } from '../CommandBuilder'
import { walkAncestors } from '../../util/walkAncestors'

export function getClosestNonNativeParent(cmd: CommandBuilder) {
  for (const anc of walkAncestors(cmd, { includeSelf: true })) {
    if (!anc.meta.isNative) return anc
  }
  return cmd.root
}
