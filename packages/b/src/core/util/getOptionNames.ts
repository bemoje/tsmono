import { CommandBuilder, getAllOptions, getGlobalOptions } from '../CommandBuilder/CommandBuilder'
import { getAncestors } from './getAncestors'

/**
 * Returns a set of all option names for a command.
 * The returned names include global options by default.
 * The returned names may include both 'short', 'long' and 'attributeName' including any prefixed '-' characters.
 * @throws If not at least one type of name is selected in the options: 'short', 'long' or 'attributeName'.
 */
export function getOptionNames(cmd: CommandBuilder, options: IGetOptionNamesOptions) {
  const { short, long, attributeName, noGlobals, trimDashes } = options
  if (!short && !long && !attributeName) {
    throw new Error("At least one of the options must be true: 'short', 'long' or 'attributeName'")
  }
  const names = new Set<string>()
  getAncestors(cmd, { includeSelf: true })
    .map((cmd) => cmd.$.options)
    .flat()
    .concat(noGlobals ? [] : getGlobalOptions(cmd))
    .forEach((opt) => {
      if (attributeName) names.add(opt.attributeName())
      if (short && opt.short) names.add(opt.short.replace(/-/g, trimDashes ? '' : '-'))
      if (long && opt.long) names.add(opt.long.replace(/-/g, trimDashes ? '' : '-'))
    })
  return names
}

export interface IGetOptionNamesOptions {
  /**
   * Whether to include option 'short' names in the result.
   */
  short?: boolean

  /**
   * Whether to include option 'long' names in the result.
   */
  long?: boolean

  /**
   * Whether to include option 'attributeName's in the result.
   */
  attributeName?: boolean

  /**
   * Whether to exclude global options in the result.
   */
  noGlobals?: boolean

  /**
   * Whether to trim prefixed dashes from the 'short' and 'long' names.
   */
  trimDashes?: boolean
}
