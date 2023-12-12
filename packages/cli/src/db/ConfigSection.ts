import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { assertThat, JsonValue, objAssign, TStringParser, TValidator } from '@bemoje/util'
import { countInstance } from '../core/counter'
import { IConfig } from '../types/IConfig'
import { JsonFile } from './JsonFile'

/**
 * A class that represents the user-config section of the JSON file used as simple database.
 */
export class ConfigSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  /**
   * String parsers for when editing config from command-line.
   */
  readonly parsers: Record<string, TStringParser<Val>> = {}

  /**
   * Descriptions for each property key.
   */
  readonly descriptions: Record<string, string> = {}

  /**
   * Validators for each property key.
   */
  readonly validators: Record<string, TValidator<Val>> = {}

  /**
   * Creates an instance of AbstractJsonFileSection.
   * @param file - The parent JsonFile instance.
   * @param name - The name of the section.
   */
  constructor(file: JsonFile, name: string) {
    super(file, name, true)
    countInstance(ConfigSection)
  }

  /**
   * Asserts that a key-value pair is valid.
   * @param key - The key to assert.
   * @param value - The value to assert.
   */
  override assertValid(key: string, value: Val) {
    if (!this.validators[key]) return
    assertThat(value, this.validators[key])
  }

  /**
   * Defines a property for the section.
   * @param key - The key of the property.
   * @param options - The options for the property.
   */
  override defineProperty(key: string, options: IConfig<Val>) {
    const { description, defaultValue, parse, validate } = options
    this.defaultValues[key] = typeof defaultValue === 'object' ? JSON.parse(JSON.stringify(defaultValue)) : defaultValue
    if (parse) this.parsers[key] = parse
    if (validate) this.validators[key] = validate
    this.descriptions[key] = description ?? ''
    this.assertValid(key, options.defaultValue)
  }

  /**
   * Initializes the section.
   * @param save - Indicates whether to save the section after initialization.
   * @returns A string if an error occurred during initialization, otherwise void.
   */
  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.db.getSafe<typeof this.defaultValues>(this.prefix())
    const result = objAssign({}, JSON.parse(JSON.stringify(this.defaultValues)), data || {})
    this.db.set(this.prefix(), result, save)
    this.isInitialized = true
  }
}
