import { Any, defaultOpenInEditorCommand, JsonValue, promptUserEditJsonInTextEditorSync } from '@bemoje/util'
import { JsonFile } from './JsonFile'

/**
 * A class that represents a section of the JSON file used as a simple database.
 */
export abstract class AbstractJsonFileSection<Val = JsonValue> {
  /**
   * Indicates whether the section has been initialized.
   */
  protected isInitialized = false

  /**
   * The default values for the section.
   */
  readonly defaultValues: Record<string, Val> = {}

  /**
   * The base string used as a prefix for the section.
   */
  readonly prefixBaseString: string

  /**
   * Creates an instance of AbstractJsonFileSection.
   * @param file - The parent JsonFile instance.
   * @param name - The name of the section.
   * @param keysAreFixed - Indicates whether the keys in the section are fixed.
   */
  constructor(readonly file: JsonFile, protected readonly name: string, protected readonly keysAreFixed: boolean) {
    this.prefixBaseString = file.cmd.getPrefixArray().join('_')
  }

  /**
   * Asserts that a key-value pair is valid.
   * @param key - The key to assert.
   * @param value - The value to assert.
   */
  abstract assertValid(key: string, value: Val): void

  /**
   * Defines a property for the section.
   * @param key - The key of the property.
   * @param options - The options for the property.
   */
  abstract defineProperty(key: string, options: Any): void

  /**
   * Initializes the section.
   * @param save - Indicates whether to save the section after initialization.
   * @returns A string if an error occurred during initialization, otherwise void.
   */
  abstract initialize(save?: boolean): void | string

  /**
   * The JsonDB associated with the section.
   */
  get db() {
    return this.file.db
  }

  /**
   * The CommandBuilder associated with the section.
   */
  get cmd() {
    return this.file.cmd
  }

  /**
   * Saves the section.
   * @returns A promise that resolves when the section is saved.
   */
  async save() {
    return await this.db.save()
  }

  /**
   * Gets the object path prefix as dot-separated keys for this section of the JSON file database.
   * @param key - An optional key to append to the prefix path.
   * @returns The object path prefix.
   * @throws An error if the keys are fixed and the specified key does not exist in the default values.
   */
  prefix(key?: string) {
    if (this.keysAreFixed && key && !Object.hasOwn(this.defaultValues, key)) {
      throw new Error(`No entry with key '${key}'`)
    }
    return this.prefixBaseString + '.' + this.name + (key ? '.' + key : '')
  }

  /**
   * Gets the value associated with the specified key.
   * @param key - The key to get the value for.
   * @returns The value associated with the key.
   */
  get<T extends Val = Val>(key: string): T {
    this.initialize(false)
    return this.db.getSafe<T>(this.prefix(key)) ?? (this.defaultValues[key] as T)
  }

  /**
   * Gets all the values in the section.
   * @returns All the values in the section.
   */
  getAll() {
    this.initialize(false)
    return (this.db.getSafe(this.prefix()) ?? JSON.parse(JSON.stringify(this.defaultValues))) as Record<string, Val>
  }

  /**
   * Gets the keys in the section.
   * @returns The keys in the section.
   */
  get keys() {
    // if (this.keysAreFixed) return Object.keys(this.defaultValues)
    return Object.keys(this.getAll())
  }

  /**
   * Gets the number of keys in the section.
   * @returns The number of keys in the section.
   */
  count() {
    return this.keys.length
  }

  /**
   * Sets the value associated with the specified key.
   * @param key - The key to set the value for.
   * @param value - The value to set.
   * @param save - Indicates whether to save the section after setting the value.
   */
  set(key: string, value: Val, save = true) {
    this.initialize()
    this.assertValid(key, value)
    this.db.set(this.prefix(key), value as JsonValue, save)
  }

  /**
   * Sets all the values in the section.
   * @param values - The values to set.
   * @param save - Indicates whether to save the section after setting the values.
   */
  setAll(values: typeof this.defaultValues, save = true) {
    const original = this.getAll()
    for (const [key, value] of Object.entries(values)) {
      if (value === original[key]) continue
      if (JSON.stringify(value) === JSON.stringify(original[key])) continue
      this.set(key, value, false)
    }
    if (!this.keysAreFixed) {
      for (const name of Object.keys(original)) {
        if (Object.hasOwn(values, name)) continue
        this.delete(name, false)
      }
    }
    if (save) this.save()
  }

  /**
   * Updates the value associated with the specified key.
   * @param key - The key to set the value for.
   * @param callback - The callback function that returns the new value.
   * @param save - Indicates whether to save the section after setting the value.
   */
  update(key: string, callback: (val: Val, key: string) => Val, save = true) {
    this.set(key, callback(this.get(key), key), save)
  }

  /**
   * Resets the value associated with the specified key to its default value.
   * @param key - The key to reset.
   * @param save - Indicates whether to save the section after resetting the value.
   */
  reset(key: string, save = true) {
    this.set(key, this.defaultValues[key], save)
  }

  /**
   * Resets all the values in the section to their default values.
   * @param save - Indicates whether to save the section after resetting the values.
   */
  resetAll(save = true) {
    this.setAll(this.defaultValues, save)
  }

  /**
   * Deletes the value associated with the specified key.
   * @param key - The key to delete.
   * @param save - Indicates whether to save the section after deleting the value.
   */
  delete(key: string, save = true) {
    this.initialize()
    this.db.delete(this.prefix(key), save)
  }

  /**
   * Deletes all the values in the section.
   * @param save - Indicates whether to save the section after deleting the values.
   */
  deleteAll(save = true) {
    for (const key of this.keys) {
      this.delete(key, false)
    }
    if (save) this.save()
  }

  /**
   * Edits the values in the section using a text editor.
   * @param editor - The text editor to use. If not specified, the default text editor command will be used.
   */
  edit(editor?: string) {
    const original = this.getAll()
    const parsed = promptUserEditJsonInTextEditorSync(original as JsonValue, editor || defaultOpenInEditorCommand())
    this.setAll(parsed as Record<string, Val>)
  }
}
