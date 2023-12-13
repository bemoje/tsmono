import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { JsonFile } from './JsonFile'
import { JsonValue } from '@bemoje/util'

/**
 * A class that represents the appdata section of the JSON file used as simple database.
 */
export class AppDataSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  /**
   * Creates an instance of AppDataSection.
   * @param file - The parent JsonFile instance.
   * @param name - The name of the section.
   */
  constructor(file: JsonFile, name: string) {
    super(file, name, false)
  }

  /**
   * Does nothing
   */
  override assertValid() {
    return
  }

  /**
   * Defines a property for the section.
   * @param key - The key of the property.
   */
  override defineProperty(key: string, value: Val) {
    if (typeof value === 'object') value = JSON.parse(JSON.stringify(value)) as Val
    this.defaultValues[key] = value
    this.isInitialized = false
  }

  /**
   * Initializes the section.
   * @param save - Indicates whether to save the section after initialization.
   * @returns A string if an error occurred during initialization, otherwise void.
   */
  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.db.getSafe<Record<string, Val>>(this.prefix())
    if (!data) this.db.set(this.prefix(), this.defaultValues, save)
    this.isInitialized = true
  }
}
