import { EventEmitter } from 'events'
import fs from 'fs-extra'
import path from 'path'
import { readJsonFileSync } from './readJsonFile/readJsonFileSync'
import { writeJsonFileSync } from './writeJsonFile/writeJsonFileSync'

/**
 * Represents a JSON file manager that ensures immutable data since everything is serialized and deserialized before receiving or returning any data.
 */
export class JsonFile<T extends Record<string, any>> extends EventEmitter {
  /**
   * The filepath of the JSON file.
   */
  readonly filepath: string

  /**
   * The data stored in the JSON file.
   */
  #data: T

  /**
   * Determines whether the JSON file should be pretty-printed.
   */
  prettyPrint: boolean

  /**
   * Gets the data stored in the JSON file.
   * @returns A deep copy of the data.
   */
  get data(): T {
    return deepClone(this.#data)
  }

  /**
   * Constructs a new instance of the JsonFile class.
   * @param filepath - The filepath of the JSON file.
   * @param prettyPrint - Determines whether the JSON file should be pretty-printed.
   */
  constructor(filepath: string, prettyPrint = false) {
    super()
    this.filepath = filepath
    this.#data = {} as T
    this.prettyPrint = prettyPrint
    this.ensureDirectoryExists()
    if (fs.existsSync(this.filepath)) {
      this.loadFile()
    } else {
      this.saveFile()
    }
  }

  /**
   * Gets the value associated with the specified key.
   * @param key - The key to retrieve the value for.
   * @returns The value associated with the key.
   */
  get(key: keyof T): any {
    return deepClone(this.#data[key])
  }

  /**
   * Sets the value associated with the specified key.
   * @param key - The key to set the value for.
   * @param value - The value to set.
   */
  set(key: keyof T, value: any): void {
    value = deepClone(value)
    if (this.#data[key] === value) return
    if (value === undefined || value === null) {
      if (this.has(key)) this.delete(key)
      return
    }
    try {
      const json = JSON.stringify(value)
      if (json === JSON.stringify(this.#data[key])) return
      value = JSON.parse(json)
    } catch (error) {
      value = ''
    }
    this.emit('set', Date.now(), key, value)
    this.#data[key] = value
    this.saveFile()
  }

  /**
   * Checks if the specified key exists in the JSON file.
   * @param key - The key to check.
   * @returns True if the key exists, false otherwise.
   */
  has(key: keyof T): boolean {
    return this.#data[key] !== undefined
  }

  /**
   * Deletes the value associated with the specified key.
   * @param key - The key to delete.
   */
  delete(key: keyof T): void {
    delete this.#data[key]
    this.emit('set', Date.now(), key, void 0)
    this.saveFile()
  }

  /**
   * Gets the value associated with the specified key, or sets it to the provided default value if it doesn't exist.
   * @param key - The key to get or set.
   * @param getValue - A function that returns the default value if the key doesn't exist.
   * @returns The value associated with the key, or the default value if it doesn't exist.
   */
  getOrElse(key: string, getValue: () => any): any {
    if (this.has(key)) {
      return deepClone(this.get(key))
    }
    const value = deepClone(getValue())
    this.set(key, value)
    return value
  }

  /**
   * Clears all the data in the JSON file.
   */
  clear(): void {
    for (const key of Object.keys(this.#data)) {
      this.set(key as keyof T, undefined)
    }
  }

  /**
   * Assigns new data to the JSON file.
   * @param data - The data to assign.
   */
  assign(data: T): void {
    for (const [key, value] of Object.entries(deepClone(data))) {
      this.set(key as keyof T, value)
    }
  }

  /**
   * Ensures that the directory containing the JSON file exists.
   */
  ensureDirectoryExists(): void {
    fs.mkdirSync(path.dirname(this.filepath), { recursive: true })
  }

  /**
   * Saves the data to the JSON file.
   */
  saveFile(): void {
    if (this.prettyPrint) {
      writeJsonFileSync(this.filepath, this.#data, { spaces: 2 })
    } else {
      writeJsonFileSync(this.filepath, this.#data)
    }
  }

  /**
   * Loads the data from the JSON file.
   */
  loadFile(): void {
    this.#data = readJsonFileSync(this.filepath) as T
  }
}

function deepClone(obj: any): any | string {
  if (typeof obj !== 'object' || obj === null) return obj
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    return ''
  }
}
