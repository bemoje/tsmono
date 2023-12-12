import { CommandBuilder } from './CommandBuilder'
import { countInstance } from '../core/counter'

/**
 * Represents a selector for enabling or disabling command features.
 */
export class CommandFeatureSelector {
  /**
   * Indicates whether the app data feature is enabled.
   */
  isAppDataEnabled = false

  /**
   * Indicates whether the config feature is enabled.
   */
  isConfigEnabled = false

  /**
   * Indicates whether the presets feature is enabled.
   */
  isPresetsEnabled = false

  /**
   * Indicates whether the auto assign missing option flags feature is enabled.
   */
  isAutoAssignMissingOptionFlagsEnabled = false

  /**
   * Indicates whether the auto assign sub command aliases feature is enabled.
   */
  isAutoAssignSubCommandAliasesEnabled = false

  /**
   * Creates a new instance of the CommandFeatureSelector class.
   * @param cmd - The command builder instance.
   */
  constructor(protected readonly cmd: CommandBuilder) {
    countInstance(CommandFeatureSelector)
  }

  /**
   * Inherits the feature settings from a parent CommandFeatureSelector instance.
   * @param parentFeatures - The parent CommandFeatureSelector instance to inherit from.
   */
  inheritFrom(parentFeatures: CommandFeatureSelector) {
    if (!parentFeatures) return
    if (this.cmd.isNative) this.isAutoAssignMissingOptionFlagsEnabled = true
    else this.isAutoAssignMissingOptionFlagsEnabled = parentFeatures.isAutoAssignMissingOptionFlagsEnabled
    this.isAutoAssignSubCommandAliasesEnabled = parentFeatures.isAutoAssignSubCommandAliasesEnabled
    this.isPresetsEnabled = parentFeatures.isPresetsEnabled
  }

  /**
   * Enables or disables the app data feature.
   * @param boolean - Indicates whether the app data feature should be enabled or disabled.
   * @returns The current CommandFeatureSelector instance.
   * @throws Error if the command is native and the app data feature is being configured.
   */
  appData(boolean = true) {
    return this.setProperty(boolean, 'isAppDataEnabled', 'appData', true)
  }

  /**
   * Enables or disables the config feature.
   * @param boolean - Indicates whether the config feature should be enabled or disabled.
   * @returns The current CommandFeatureSelector instance.
   * @throws Error if the command is native and the config feature is being configured.
   */
  config(boolean = true) {
    return this.setProperty(boolean, 'isConfigEnabled', 'config', true)
  }

  /**
   * Enables or disables the presets feature.
   * @param boolean - Indicates whether the presets feature should be enabled or disabled.
   * @returns The current CommandFeatureSelector instance.
   * @throws Error if the command is native and the presets feature is being configured.
   */
  presets(boolean = true) {
    return this.setProperty(boolean, 'isPresetsEnabled', 'presets', true)
  }

  /**
   * Enables or disables the auto assign missing option flags feature.
   * @param boolean - Indicates whether the auto assign missing option flags feature should be enabled or disabled.
   * @returns The current CommandFeatureSelector instance.
   */
  autoAssignMissingOptionFlags(boolean = true) {
    return this.setProperty(boolean, 'isAutoAssignMissingOptionFlagsEnabled', 'autoAssignMissingOptionFlags', false)
  }

  /**
   * Enables or disables the auto assign sub command aliases feature.
   * @param boolean - Indicates whether the auto assign sub command aliases feature should be enabled or disabled.
   * @returns The current CommandFeatureSelector instance.
   */
  autoAssignSubCommandAliases(boolean = true) {
    return this.setProperty(boolean, 'isAutoAssignSubCommandAliasesEnabled', 'autoAssignSubCommandAliases', false)
  }

  /**
   * Helper method to enable or disable a feature.
   * @param boolean - Indicates whether the auto assign sub command aliases feature should be enabled or disabled.
   * @param prop - The property name to set.
   * @param method - The method name to output in the debug message.
   * @param throwIfNative - Indicates whether an error should be thrown if the command is native.
   * @returns The current CommandFeatureSelector instance.
   */
  protected setProperty(boolean = true, prop: keyof this, method: string, throwIfNative: boolean) {
    if (this[prop] === boolean) return this
    if (throwIfNative && this.cmd.isNative) throw new Error(`Cannot configure ${method} for native command.`)
    Object.defineProperty(this, prop, { value: boolean, configurable: true, writable: true, enumerable: true })
    this.cmd.outputDebugMessage('featureEnabled', () => ({ [method]: boolean }))
    return this
  }
}
