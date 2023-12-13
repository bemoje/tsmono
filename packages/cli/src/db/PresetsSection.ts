import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import type { IPreset } from '../types/IPreset'
import { JsonFile } from './JsonFile'
import { objAssign } from '@bemoje/util'
import type { OptionValues } from '@commander-js/extra-typings'

/**
 * A class that represents the user-presets section of the JSON file used as simple database.
 */
export class PresetsSection extends AbstractJsonFileSection<IPreset> {
  /**
   * Creates an instance of AppDataSection.
   * @param file - The parent JsonFile instance.
   * @param name - The name of the section.
   */
  constructor(file: JsonFile, name: string) {
    super(file, name, false)
    this.defineProperty('defaults', {
      description: 'All presets inherit from this preset',
      presets: [],
      args: this.cmd.arguments.map((arg) => arg.defaultValue ?? null),
      options: this.cmd.getOwnAndGlobalOptions().reduce((acc, opt) => {
        acc[opt.attributeName()] = opt.defaultValue ?? (opt.isBoolean() ? false : null)
        return acc
      }, {} as OptionValues),
    })
  }

  /**
   * Asserts that a key-value pair is valid.
   * @param key - The key to assert.
   * @param value - The preset options to validate.
   */
  override assertValid(key: string, value: IPreset) {
    this.cmd.assertValidPreset(key, value)
  }

  /**
   * Defines a property for the section.
   * @param key - The key of the property.
   * @param options - The options for the property.
   */
  override defineProperty(key: string, options: IPreset) {
    if (this.defaultValues[key]) throw new Error(`Cannot redefine preset '${key}'.`)
    this.defaultValues[key] = JSON.parse(JSON.stringify(options)) as IPreset
    this.assertValid(key, options)
    this.isInitialized = false
  }

  /**
   * Initializes the section.
   * @param save - Indicates whether to save the section after initialization.
   * @returns A string if an error occurred during initialization, otherwise void.
   */
  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.db.getSafe<Record<string, IPreset>>(this.prefix())
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
    this.db.set(this.prefix(), presets, save)
    this.isInitialized = true
  }

  /**
   * Sets all the values in the section.
   * @param values - The values to set.
   * @param save - Indicates whether to save the section after setting the values.
   */
  override async setAll(presets: Record<string, IPreset>, save = true) {
    if (!presets['defaults']) presets['defaults'] = JSON.parse(JSON.stringify(this.defaultValues['defaults']))
    super.setAll(presets, save)
  }

  /**
   * Deletes the value associated with the specified key.
   * @param key - The key to delete.
   * @param save - Indicates whether to save the section after deleting the value.
   */
  override delete(name: string, save = true) {
    if (Object.hasOwn(this.defaultValues, name)) throw new Error('Cannot delete the builtin presets.')
    super.delete(name, save)
  }
}
