import { assertThat } from '../validation/assertThat'
import { isObject } from '../validation/isObject'
import { JsonObject } from '../types/JsonObject'
import { JsonValue } from '../types/JsonValue'
import { readJsonFileSafeSync } from '../fs/readJsonFile/readJsonFileSafeSync'
import { writeJsonFileSafe } from '../fs/writeJsonFile/writeJsonFileSafe'

/**
 * Represents a simple JSON file database.
 */
export class JsonDB {
  /**
   * The data stored in the JSON database.
   */
  protected data: JsonObject

  /**
   * Creates a new instance of the JsonDB class.
   * @param filepath - The filepath where the data file is stored or to be stored.
   */
  constructor(protected filepath: string, protected indents = 0) {
    this.data = readJsonFileSafeSync(this.filepath) ?? {}
  }

  /**
   * Saves the data to the JSON file.
   */
  async save(indents = this.indents): Promise<void> {
    return await writeJsonFileSafe(this.filepath, this.data, { spaces: indents })
  }

  /**
   * Sets the filepath of the JSON file.
   * @param filepath - The new filepath.
   */
  setFilepath(filepath: string, save = true): void {
    if (this.filepath === filepath) return
    this.filepath = filepath
    if (save) this.save()
  }

  /**
   * Sets a value in the JSON database.
   * @param prefix - Object path prefix as dot-separated keys.
   * @param value - The value to set.
   * @param save - Whether to save the data to the JSON file.
   */
  set(prefix?: string, value: JsonValue = {}, save = true): void {
    if (!prefix) {
      this.data = assertThat(value, isObject) as JsonObject
    } else {
      const keys = prefix.split('.')
      const lastKey = keys.pop() as string
      let node: JsonObject = this.data
      for (const key of keys) {
        if (!Object.hasOwn(node, key)) {
          node[key] = {}
        }
        node = node[key] as JsonObject
      }
      node[lastKey] = this.cloneDeep(value)
    }
    if (save) this.save()
  }

  /**
   * Gets a value from the JSON database.
   * @param prefix - Object path prefix as dot-separated keys.
   * @returns The value associated with the key.
   * @throws An error if no entry is found at the specified key.
   */
  get<T = JsonValue>(prefix?: string): T {
    const value = this.getSafe<T>(prefix)
    if (value === undefined) throw new Error(`No entry at '${prefix}'`)
    return this.cloneDeep(value)
  }

  /**
   * Gets a value from the JSON database safely.
   * @param prefix - Object path prefix as dot-separated keys.
   * @returns The value associated with the key, or undefined if no entry is found.
   */
  getSafe<T = JsonValue>(prefix?: string): T | undefined {
    if (!prefix) return this.cloneDeep(this.data) as T
    const keys = prefix.split('.')
    let node: JsonObject = this.data
    for (const key of keys) {
      if (!Object.hasOwn(node, key)) {
        return undefined
      }
      node = node[key] as JsonObject
    }
    return this.cloneDeep(node) as T
  }

  /**
   * Checks if a key exists in the JSON database.
   * @param prefix - Object path prefix as dot-separated keys.
   * @returns True if the key exists, false otherwise.
   */
  has(prefix?: string): boolean {
    if (!prefix) return true
    return this.getSafe(prefix) !== undefined
  }

  /**
   * Deletes a value from the JSON database.
   * @param prefix - Object path prefix as dot-separated keys.
   * @param save - Whether to save the data to the JSON file.
   */
  delete(prefix?: string, save = true): void {
    if (!prefix) {
      this.data = {}
    } else {
      const keys = prefix.split('.')
      const lastKey = keys.pop() as string
      let node: JsonObject = this.data
      for (const key of keys) {
        if (!Object.hasOwn(node, key)) {
          return
        }
        node = node[key] as JsonObject
      }
      delete node[lastKey]
    }
    if (save) this.save()
  }

  /**
   * Creates a deep clone of an object.
   * @param obj - The object to clone.
   * @returns The cloned object.
   */
  protected cloneDeep<T extends JsonValue>(obj: T): T {
    if (typeof obj !== 'object') return obj
    return JSON.parse(JSON.stringify(obj)) as T
  }
}
