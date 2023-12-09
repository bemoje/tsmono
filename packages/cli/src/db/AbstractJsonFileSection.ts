import { Any, defaultOpenInEditorCommand, JsonValue, promptUserEditJsonInTextEditorSync } from '@bemoje/util'
import { JsonFile } from './JsonFile'

/**
 * A class that represents the a section of the JSON file used as simple database.
 */
export abstract class AbstractJsonFileSection<Val = JsonValue> {
  protected isInitialized = false
  readonly defaultValues: Record<string, Val> = {}
  readonly prefixString: string

  /**
   * @param file The parent JsonFile instance.
   * @param name The name of the section.
   */
  constructor(readonly file: JsonFile, protected readonly name: string, protected readonly keysAreFixed: boolean) {
    this.prefixString = file.cmd.getPrefixArray().join('_')
  }

  abstract assertValid(key: string, value: Val): void

  abstract defineProperty(key: string, options: Any): void

  abstract initialize(save?: boolean): void | string

  /**
   * Get the db lookup prefix for this section.
   * @param key An optional key to append to the prefix.
   */
  protected prefix(key?: string) {
    if (this.keysAreFixed && key && !Object.hasOwn(this.defaultValues, key)) {
      console.log({ errorDefVal: this.defaultValues, key })
      throw new Error(`No entry with key '${key}'`)
    }
    return this.prefixString + '.' + this.name + (key ? '.' + key : '')
  }

  get<T extends Val = Val>(key: string): T {
    this.initialize(false)
    return this.file.db.getSafe<T>(this.prefix(key)) ?? (this.defaultValues[key] as T)
  }

  getAll(): typeof this.defaultValues {
    this.initialize(false)
    return this.file.db.getSafe<typeof this.defaultValues>(this.prefix()) ?? this.defaultValues
  }

  count() {
    return Object.keys(this.file.db.getSafe(this.prefix()) || {}).length
  }

  set(key: string, value: Val, save = true) {
    this.initialize()
    this.assertValid(key, value)
    this.file.db.set(this.prefix(key), value as JsonValue, save)
  }

  setAll(values: typeof this.defaultValues, save = true) {
    const original = this.getAll()
    for (const [key, value] of Object.entries(values)) {
      // if (JSON.stringify(value) === JSON.stringify(original[key])) continue
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

  reset(key: string, save = true) {
    this.set(key, this.defaultValues[key], save)
  }

  resetAll(save = true) {
    this.setAll(this.defaultValues, save)
  }

  /**
   * Actions:
   * - save the database to disk
   * - verify that the JSON file is valid JSON data
   * - format as human readable with 2 indents
   */
  protected save() {
    this.file.db.save()
  }

  delete(key: string, save = true) {
    this.initialize()
    this.file.db.delete(this.prefix(key), save)
  }

  deleteAll(save = true) {
    for (const key of Object.keys(this.getAll())) {
      this.delete(key, false)
    }
    if (save) this.save()
  }

  edit(editor?: string) {
    const original = this.getAll()
    const parsed = promptUserEditJsonInTextEditorSync(original as JsonValue, editor || defaultOpenInEditorCommand())
    this.setAll(parsed as typeof this.defaultValues)
  }
}
