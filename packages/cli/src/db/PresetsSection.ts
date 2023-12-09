import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { countInstance } from '../core/counter'
import { IPreset } from '../types/IPreset'
import { JsonFile } from './JsonFile'
import { objAssign } from '@bemoje/util'
import { OptionValues } from 'commander'

/**
 * A class that represents the user-presets section of the JSON file used as simple database.
 */
export class PresetsSection extends AbstractJsonFileSection<IPreset> {
  constructor(file: JsonFile, name: string, keysAreFixed = false) {
    super(file, name, keysAreFixed)
    countInstance(PresetsSection)

    this.defineProperty('defaults', {
      description: 'All presets inherit from this preset',
      presets: [],
      args: this.file.cmd.arguments.map((arg) => arg.defaultValue ?? null),
      options: this.file.cmd.getOwnAndGlobalOptions().reduce((acc, opt) => {
        acc[opt.attributeName()] = opt.defaultValue ?? (opt.isBoolean() ? false : null)
        return acc
      }, {} as OptionValues),
    })
  }

  override assertValid(key: string, value: IPreset) {
    this.file.cmd.assertValidPreset(key, value)
  }

  override defineProperty(key: string, options: IPreset) {
    this.defaultValues[key] = JSON.parse(JSON.stringify(options)) as IPreset
    this.assertValid(key, options)
    this.isInitialized = false
  }

  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.file.db.getSafe<IPreset>(this.prefix())
    const presets = objAssign({}, this.defaultValues, data || {})
    const presetNames = Object.keys(presets)
    for (const preset of Object.values(presets)) {
      for (const pname of presetNames) {
        if (preset.options[pname]) {
          preset.presets.push(pname)
          delete preset.options[pname]
          save = true
        }
      }
    }
    this.file.db.set(this.prefix(), presets, save)
    this.isInitialized = true
  }

  override delete(name: string, save = true) {
    if (Object.hasOwn(this.defaultValues, name)) throw new Error('Cannot delete the builtin presets.')
    super.delete(name, save)
  }

  override async setAll(presets: typeof this.defaultValues, save = true) {
    if (!presets['defaults']) presets['defaults'] = this.defaultValues['defaults']
    super.setAll(presets, save)
  }
}
