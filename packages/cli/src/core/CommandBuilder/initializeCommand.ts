import { actionWrapper } from './features/action/actionWrapper'
import { addUtilCommands } from './features/addUtilCommands'
import { assertNoDuplicateCommandNames } from './features/assertNoDuplicateCommandNames'
import { assertNoDuplicateOptionNames } from './features/assertNoDuplicateOptionNames'
import { autoAssignMissingOptionFlags } from './features/autoAssignMissingOptionFlags'
import { autoAssignSubCommandAliases } from './features/autoAssignSubCommandAliases'
import { CommandBuilder } from './CommandBuilder'
import { configureHelp } from '../help/configureHelp'
import { ensureBackRefToCommandBuilder } from './ensureBackRefToCommandBuilder'

export function initializeCommand(cmd: CommandBuilder, callback?: (cmd: CommandBuilder) => void) {
  const t0_precb = Date.now()
  ensureBackRefToCommandBuilder(cmd)
  actionWrapper(cmd)
  configureHelp(cmd)
  inheritBasicSettings(cmd)
  inheritHiddenGlobalOptions(cmd)
  const precb = Date.now() - t0_precb

  const t0_cb = Date.now()
  if (callback) callback(cmd)
  const cb = Date.now() - t0_cb

  const t0_postcb = Date.now()
  if (cmd.features.isUtilsEnabled) addUtilCommands(cmd)

  if (cmd.features.isAutoAssignSubCommandAliasesEnabled) {
    autoAssignSubCommandAliases(cmd)
  }

  if (cmd.features.isAutoAssignMissingOptionFlagsEnabled) {
    autoAssignMissingOptionFlags(cmd)
  }

  assertNoDuplicateCommandNames(cmd)
  assertNoDuplicateOptionNames(cmd)
  const postcb = Date.now() - t0_postcb
  if (precb + cb + postcb > 10) cmd.outputDebugInfo('init timer', () => ({ precb, cb, postcb }))

  return cmd
}

function inheritBasicSettings(cmd: CommandBuilder) {
  if (!cmd.parent) return
  const cmdr = cmd.$
  if (cmdr.parent) cmdr.copyInheritedSettings(cmdr.parent)
}

function inheritHiddenGlobalOptions(cmd: CommandBuilder) {
  if (!cmd.parent) return
  for (const opt of cmd.parent.meta.hiddenGlobalOptions) {
    cmd.meta.hiddenGlobalOptions.add(opt)
  }
}
