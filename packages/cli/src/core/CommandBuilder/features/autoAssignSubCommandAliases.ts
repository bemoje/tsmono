import { arrSome } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder'
import { getSiblings } from '../../util/getSiblings'

/**
 * Makes aliases for the command.
 * The idea is to be able to navigate the command tree by only typing the first letter(s) of the command names.
 *
 * Example: A command 'cola' would get these aliases: ['c', 'co', 'col'].
 * However, if there are namespace clashes with sibling subcommands that start with the same letter,
 * eg. like 'cola' and 'coal' where the first two letters clash, cola's aliases are reduced to only ['col'] and similarly for 'coal'.
 *
 * This method creates the aliases, ensuring there are no clashes with sublings, why it is important that the
 * entire command tree is built before invoking this method.
 */
export function autoAssignSubCommandAliases(cmd: CommandBuilder): void {
  if (cmd.get.alias || cmd.name.length <= 1) return
  const sibAliases = getSiblings(cmd)
    .map((sib) => sib.get.aliases)
    .flat()
  for (let i = 0; i < cmd.name.length - 1; i++) {
    let cmdAlias = cmd.name.substring(0, i + 1)
    let isClash = arrSome(sibAliases, (sibAlias) => {
      return cmdAlias === sibAlias
    })
    if (isClash && i === 0) {
      cmdAlias = cmdAlias.charAt(0).toUpperCase()
      isClash = arrSome(sibAliases, (sibAlias) => {
        return cmdAlias === sibAlias
      })
    }
    if (isClash) continue
    cmd.alias(cmdAlias)
    return
  }
}
