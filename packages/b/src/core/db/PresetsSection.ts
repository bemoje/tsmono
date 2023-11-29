import { assertValidPreset } from '../util/assertValidPreset'
import { getAllOptions } from '../CommandBuilder/CommandBuilder'
import { IPreset } from '../../types/IPreset'
import { JsonFile } from './JsonFile'
import { JsonFileError } from './JsonFileError'
import { JsonFileSection } from './JsonFileSection'
import { JsonValue } from '@bemoje/util'
import { OptionValues } from 'commander'

/**
 * A class that represents the user-presets section of the JSON file used as simple database.
 */
export class PresetsSection extends JsonFileSection<IPreset> {
  constructor(file: JsonFile, name: string, hasFixedKeysForUser = false) {
    super(file, name, hasFixedKeysForUser)

    this.defineProperty('defaults', {
      description: 'All presets inherit from this preset',
      presets: [],
      args: this.file.cmd.arguments.map((arg) => arg.defaultValue ?? null),
      options: getAllOptions(this.file.cmd).reduce((acc, opt) => {
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
    this.isInitialized = false
  }

  override initialize(save = true) {
    if (this.isInitialized) return
    if (!this.file.cmd.isPresetsEnabled) {
      throw new JsonFileError('PresetsSection.initialize() called when presets are disabled')
    }
    const presets = Object.assign(
      {},
      this.defaultValues,
      this.file.db.getSafe(this.prefix()) ?? {}
    ) as typeof this.defaultValues
    const disabled = this.file.db.getSafe<string[]>('config.disabledBuiltinPresets') ?? []
    // merge args
    this.defaultValues['defaults'].args.forEach((arg, i) => {
      if (presets['defaults'].args[i] == undefined) presets['defaults'].args[i] = arg
    })
    // merge default options
    presets['defaults'].options = Object.assign({}, this.defaultValues['defaults'].options, presets['defaults'].options)
    // remove disabled presets
    for (const name of disabled) {
      if (Object.hasOwn(presets, name)) {
        delete presets[name]
      }
    }
    for (const [name, preset] of Object.entries(presets)) {
      // find and remove invalid options
      for (const key of Object.keys(preset.options)) {
        if (!Object.hasOwn(this.defaultValues['defaults'].options, key)) {
          delete preset.options[key]
          console.warn(`In preset, ${name}, deleted invalid option: '${key}'`)
        }
      }
      // find and remove invalid preset references
      preset.presets = preset.presets.filter((key) => {
        const bool = Object.hasOwn(presets, key)
        if (!bool) console.warn(`In preset, ${key}, deleted invalid reference to other preset: '${key}'`)
        return bool
      })
      // validate
      assertValidPreset(this.file.cmd, name, preset)
    }
    if (this.isInitialized) return
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
