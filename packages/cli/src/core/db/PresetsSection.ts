import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { assertValidPreset } from '../util/assertValidPreset'
import { getOwnAndGlobalOptions } from '../CommandBuilder/getOwnAndGlobalOptions'
import { IPreset } from '../../types/IPreset'
import { JsonFile } from './JsonFile'
import { JsonFileError } from './JsonFileError'
import { JsonValue } from '@bemoje/util'
import { objAssign } from '../util/objAssign'
import { OptionValues } from 'commander'

/**
 * A class that represents the user-presets section of the JSON file used as simple database.
 */
export class PresetsSection extends AbstractJsonFileSection<IPreset> {
  constructor(file: JsonFile, name: string, hasFixedKeysForUser = false) {
    super(file, name, hasFixedKeysForUser)

    this.defineProperty('defaults', {
      description: 'All presets inherit from this preset',
      presets: [],
      args: this.file.cmd.arguments.map((arg) => arg.defaultValue ?? null),
      options: getOwnAndGlobalOptions(this.file.cmd).reduce((acc, opt) => {
        acc[opt.attributeName()] = opt.defaultValue ?? (opt.isBoolean() ? false : null)
        return acc
      }, {} as OptionValues),
    })
  }

  override assertValid(key: string, value: IPreset) {
    assertValidPreset(this.file.cmd, key, value)
  }

  override defineProperty(key: string, options: IPreset) {
    this.defaultValues[key] = options
    this.assertValid(key, options)
    this.isInitialized = false
  }

  override initialize(save = true) {
    if (this.isInitialized) return
    type K = keyof typeof this.defaultValues
    type V = (typeof this.defaultValues)[K]
    const data = this.file.db.getSafe<V>(this.prefix())
    const hasData = data && Object.keys(data).length
    const presets = objAssign(
      {},
      JSON.parse(JSON.stringify(this.defaultValues)),
      data || {}
    ) as typeof this.defaultValues
    // remove disabled presets
    const disabled = this.file.db.getSafe<string[]>('config.disabledBuiltinPresets')
    for (const name of disabled || []) {
      if (Object.hasOwn(presets, name)) {
        delete presets[name]
        save = true
      }
    }
    // merge data
    if (hasData) {
      //   presets['defaults'].args = arrAssign([], this.defaultValues['defaults'].args, presets['defaults'].args)
      //   presets['defaults'].options = objAssign({}, this.defaultValues['defaults'].options, presets['defaults'].options)
      //   for (const preset of Object.values(presets)) {
      //     preset.args = arrAssign([], this.defaultValues['defaults'].args, preset.args)
      //     preset.options = objAssign({}, this.defaultValues['defaults'].options, preset.options)
      //     preset.presets = preset.presets || this.defaultValues['defaults'].presets
      //     // objAssign(preset.options, this.defaultValues['defaults'].options)
      //     // preset.options = objFilter(preset.options, (_, key) => Object.hasOwn(this.defaultValues, key))
      //     // preset.presets = preset.presets.filter((key: string) => Object.hasOwn(this.defaultValues, key))
      //   }
      if (JSON.stringify(data) !== JSON.stringify(presets)) {
        save = true
      }
    }
    this.file.db.set(this.prefix(), presets as unknown as JsonValue, save)
    this.isInitialized = true
  }

  override delete(name: string, save = true) {
    if (name === 'defaults') throw new JsonFileError('Cannot delete the "defaults" preset.')
    super.delete(name, save)
    if (!Object.hasOwn(this.defaultValues, name)) return
    const disabled = this.file.config.get<string[]>('disabledBuiltinPresets')
    if (disabled.includes(name)) return
    this.file.config.set('disabledBuiltinPresets', disabled.concat(name), save)
  }

  override async setAll(presets: typeof this.defaultValues, save = true) {
    if (!presets['defaults']) throw new JsonFileError('Missing "defaults" preset')
    super.setAll(presets, save)
  }
}
