import { Base } from './Base'
import { CommandBuilder } from './CommandBuilder'

/**
 *
 */
export class CommandFeatureSelector extends Base {
  protected _utils = false
  protected _config = false
  protected _presets = false
  protected _autoAssignMissingOptionFlags = false
  protected _autoAssignSubCommandAliases = false

  constructor(protected readonly cmd: CommandBuilder) {
    super()
    const parent = cmd?.parent?.features
    if (parent) {
      if (!this.cmd.meta.isNative) {
        this._utils = parent._utils
        this._config = parent._config
        this._presets = parent._presets
      }
      this._autoAssignMissingOptionFlags = parent._autoAssignMissingOptionFlags
      this._autoAssignSubCommandAliases = parent._autoAssignSubCommandAliases
    }
  }

  protected debugToggle(info: Record<string, boolean>) {
    this.cmd.outputDebugInfo('featureEnabled', () => info)
  }

  utils(boolean = true) {
    if (this._utils === boolean) return this
    if (this.cmd.meta.isNative) throw new Error('Cannot configure utils for native command.')
    this._utils = boolean
    this.debugToggle({ utils: boolean })
    return this
  }

  config(boolean = true) {
    if (this._config === boolean) return this
    if (this.cmd.meta.isNative) throw new Error('Cannot configure config for native command.')
    if (this._config !== boolean) {
      this._config = boolean
      this.debugToggle({ config: boolean })
    }
    return this
  }

  presets(boolean = true) {
    if (this.cmd.meta.isNative) {
      throw new Error('Cannot configure presets for native command.')
    }
    if (this._presets !== boolean) {
      this._presets = boolean
      this.debugToggle({ presets: boolean })
    }
    return this
  }

  autoAssignMissingOptionFlags(boolean = true) {
    if (this._autoAssignMissingOptionFlags !== boolean) {
      this._autoAssignMissingOptionFlags = boolean
      this.debugToggle({ autoAssignMissingOptionFlags: boolean })
    }
    return this
  }

  autoAssignSubCommandAliases(boolean = true) {
    if (this._autoAssignSubCommandAliases !== boolean) {
      this._autoAssignSubCommandAliases = boolean
      this.debugToggle({ autoAssignSubCommandAliases: boolean })
    }
    return this
  }

  all(boolean = true) {
    this.utils(boolean)
    this.config(boolean)
    this.presets(boolean)
    this.autoAssignMissingOptionFlags(boolean)
    this.autoAssignSubCommandAliases(boolean)
    return this.cmd
  }

  get isUtilsEnabled() {
    if (this.cmd.meta.isNative) return false
    return this._utils
  }
  get isConfigEnabled() {
    if (this.cmd.meta.isNative) return false
    return this._config
  }
  get isPresetsEnabled() {
    if (this.cmd.meta.isNative) return false
    return this._presets
  }
  get isAutoAssignMissingOptionFlagsEnabled() {
    return this._autoAssignMissingOptionFlags
  }
  get isAutoAssignSubCommandAliasesEnabled() {
    return this._autoAssignSubCommandAliases
  }
}
