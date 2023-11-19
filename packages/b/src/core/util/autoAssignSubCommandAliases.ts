import { arrSome } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { getSiblings } from './getSiblings'

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
  let isClashing = true
  const aliases = []
  for (let i = 0; i < cmd.name.length; i++) {
    if (isClashing) {
      const isStillClashing = arrSome(getSiblings(cmd), (sibling) => {
        return sibling.name.charAt(i) === cmd.name.charAt(i)
      })
      if (isStillClashing) continue
      else isClashing = false
    }
    const alias = cmd.name.substring(0, i + 1)
    if (alias === cmd.name) break
    aliases.push(alias)
  }
  cmd.$.aliases(aliases)
}
