import { CommandBuilder, getGlobalOptions } from '../CommandBuilder/CommandBuilder'
import { forEachChildRecursive } from './forEachChildRecursive'
import { getAncestors } from './getAncestors'
import { getChildren } from './getChildren'
import { Option } from 'commander'
import { setOptionShortName } from './setOptionShortName'

/**
 * Automatically set 'short' and 'long' names to options that don't have one assigned yet.
 *
 * First, it tries to assign a short name based on the first letter of the option's attribute name
 * Both lower and upper case are tried. If these is not available, the next letter of the option name is tried.
 *
 * If none of the letters of the option name are available, the option is skipped until all other
 * options have had letters from their names attempted assigned.
 * Those that remain are assigned the first available letter of the alphabet + 0-9.
 * If there are 64 options for the command and no more alphanumeric characters are available,
 * the option is not assigned a short name.
 */
export function autoAssignMissingOptionFlags(cmd: CommandBuilder) {
  if (cmd.isPreset) return

  const taken = new Set(
    getAncestors(cmd, { includeSelf: true })
      .concat(getChildren(cmd))
      .map((anc) => anc.$.options)
      .flat()
      .map((opt) => opt.short?.replace(/-/g, ''))
      .filter(Boolean)
  )

  const failed = new Set<Option>()

  // assign letter from option name
  cmd.options.forEach((opt) => {
    if (opt.short) return
    const name = opt.attributeName()
    for (let c = 0; c < name.length; c++) {
      let char = name.charAt(c).toLowerCase()
      if (taken.has(char)) {
        char = char.toUpperCase()
        if (taken.has(char)) continue
      }
      setOptionShortName(opt, char)
      taken.add(char)
      return
    }
    failed.add(opt)
  })

  // assign random alphanumeric character.
  const name = 'abcdefghijklmnopqrstuvwxyz1234567890'
  failed.forEach((opt) => {
    for (let c = 0; c < name.length; c++) {
      let char = name.charAt(c)
      if (taken.has(char)) {
        char = char.toUpperCase()
        if (taken.has(char)) continue
      }
      setOptionShortName(opt, char)
      taken.add(char)
      return
    }
  })
}

export function autoAssignMissingOptionFlagsRecursive(cmd: CommandBuilder) {
  if (cmd.isRoot) forEachChildRecursive(cmd, autoAssignMissingOptionFlags, { includeSelf: true })
}
