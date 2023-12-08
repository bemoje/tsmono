import { CommandBuilder } from './CommandBuilder'

/**
 *
 */
export class CommandFeatureSelector {
  isAppDataEnabled = false
  isConfigEnabled = false
  isPresetsEnabled = true
  isAutoAssignMissingOptionFlagsEnabled = true
  isAutoAssignSubCommandAliasesEnabled = true

  constructor(protected readonly cmd: CommandBuilder) {}

  inheritFrom(parentFeatures: CommandFeatureSelector) {
    if (!parentFeatures) return
    if (this.cmd.isNative) {
      this.isPresetsEnabled = false
      Object.freeze(this)
      return
    }
    this.isPresetsEnabled = parentFeatures.isPresetsEnabled
    this.isAutoAssignMissingOptionFlagsEnabled = parentFeatures.isAutoAssignMissingOptionFlagsEnabled
    this.isAutoAssignSubCommandAliasesEnabled = parentFeatures.isAutoAssignSubCommandAliasesEnabled
  }

  appData(boolean = true) {
    if (this.isAppDataEnabled === boolean) return this
    if (this.cmd.isNative) throw new Error('Cannot configure appData for native command.')
    this.isAppDataEnabled = boolean
    this.cmd.outputDebugInfo('featureEnabled', () => ({ appData: boolean }))
    return this
  }

  config(boolean = true) {
    if (this.isConfigEnabled === boolean) return this
    if (this.cmd.isNative) throw new Error('Cannot configure config for native command.')
    this.isConfigEnabled = boolean
    this.cmd.outputDebugInfo('featureEnabled', () => ({ config: boolean }))
    return this
  }

  presets(boolean = true) {
    if (this.isPresetsEnabled === boolean) return this
    if (this.cmd.isNative) throw new Error('Cannot configure presets for native command.')
    this.isPresetsEnabled = boolean
    this.cmd.outputDebugInfo('featureEnabled', () => ({ presets: boolean }))
    return this
  }

  autoAssignMissingOptionFlags(boolean = true) {
    if (this.isAutoAssignMissingOptionFlagsEnabled === boolean) return this
    this.isAutoAssignMissingOptionFlagsEnabled = boolean
    this.cmd.outputDebugInfo('featureEnabled', () => ({ autoAssignMissingOptionFlags: boolean }))
    return this
  }

  autoAssignSubCommandAliases(boolean = true) {
    if (this.isAutoAssignSubCommandAliasesEnabled === boolean) return this
    this.isAutoAssignSubCommandAliasesEnabled = boolean
    this.cmd.outputDebugInfo('featureEnabled', () => ({ autoAssignSubCommandAliases: boolean }))
    return this
  }
}
