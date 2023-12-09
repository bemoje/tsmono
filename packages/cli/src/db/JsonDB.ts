import { assertThat, isObject, JsonObject, JsonValue, readJsonFileSafeSync, writeJsonFileSafe } from '@bemoje/util'
import { countInstance } from '../core/counter'
import { JsonFile } from './JsonFile'

export class JsonDB {
  protected data: JsonObject

  /**
   * @param filepath The path to the JSON file.
   */
  constructor(protected readonly file: JsonFile) {
    this.data = readJsonFileSafeSync(this.filepath) ?? {}
    countInstance(JsonDB)
  }

  get filepath() {
    return this.file.cmd.getJsonFilepath()
  }

  save() {
    writeJsonFileSafe(this.filepath, this.data, { spaces: 1 }).catch((err) => {
      this.file.cmd.meta.errorHandler.call(this.file.cmd.$, err, this.file.cmd)
    })
  }

  set(prefix?: string, value: JsonValue = {}, save = true) {
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

  get<T = JsonValue>(prefix?: string): T {
    const value = this.getSafe<T>(prefix)
    if (value === undefined) throw new Error(`No entry with key '${prefix}'`)
    return value
  }

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

  has(prefix?: string) {
    if (!prefix) return true
    return this.getSafe(prefix) !== undefined
  }

  delete(prefix?: string, save = true) {
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

  protected cloneDeep(obj: JsonValue) {
    return JSON.parse(JSON.stringify(obj))
  }
}
