import { assertThat, JsonObject, JsonValue } from '@bemoje/util'
import { CommandBuilder, IConfigEntry } from './CommandBuilder'
import { Config, JsonDB } from 'node-json-db'
import { defaultOpenInEditorCommand } from '../util/defaultOpenInEditorCommand'
import { forEachChildRecursive, walkChildren } from '../util/forEachChildRecursive'
import { getAncestors } from '../util/getAncestors'
import { getUserInputFromEditorSync } from './getUserInputFromEditorSync'
import { parseString } from '../../parsers/parseString'
import { realizeLazyProperty } from '../util/realizeLazyProperty'

/**
 * asdf
 */
export class ConfigFile {
  readonly parent: CommandBuilder
  constructor(parent: CommandBuilder) {
    this.parent = parent
  }
  get db() {
    return realizeLazyProperty(this, 'db', new JsonDB(new Config(this.parent.filepath, false, true, '.')))
  }
  get config() {
    return realizeLazyProperty(this, 'config', new ConfigFileSection(this, 'config'))
  }
  get presets() {
    return realizeLazyProperty(this, 'presets', new ConfigFileSection(this, 'presets'))
  }
}

/**
 * A section of the config file.
 */
export class ConfigFileSection {
  protected readonly parent: ConfigFile
  protected readonly prefixBase: string
  readonly definitions: Record<string, IConfigEntry<Any>> = {}

  constructor(parent: ConfigFile, name: string) {
    this.parent = parent
    this.prefixBase = 'data.' + name
    this.definitions['editor'] = {
      key: 'editor',
      description: 'application launch command for your preferred text editor.',
      defaultValue: defaultOpenInEditorCommand(),
      parse: parseString,
      validate: null,
    }
  }

  get db() {
    return this.parent.db
  }
  defaultsObject(): JsonObject {
    const result: Record<string, JsonValue> = {}
    for (const [key, value] of Object.entries(this.definitions)) {
      result[key] = value.defaultValue
    }
    return result
  }
  protected prefix(key?: string) {
    if (key && !this.definitions[key]) {
      throw new Error(`No config entry with key '${key}'`)
    }
    return this.prefixBase + (key ? '.' + key : '')
  }
  protected default(key?: string) {
    return key ? this.definitions[key].defaultValue : this.defaultsObject()
  }
  async initialize(save = true) {
    if (!(await this.has())) return this.reset()
    const values = await this.get<JsonObject>()
    const result: JsonObject = {}
    for (const key of Object.keys(this.definitions)) {
      if (values[key] != null) {
        result[key] = values[key]
      } else {
        result[key] = this.default(key)
      }
    }
    this.set(undefined, result, save)
  }
  async has(key?: string) {
    return await this.db.exists(this.prefix(key))
  }
  async get<T extends JsonValue = JsonValue, K extends string | undefined = string | undefined>(
    key?: K
  ): Promise<K extends string ? T : Record<string, T>> {
    type R = K extends string ? T : Record<string, T>
    return await this.db.getObjectDefault<R>(this.prefix(key), this.default(key) as Any)
  }
  async set<T extends JsonValue>(key?: string, value?: T, save = true) {
    const _value = value === undefined ? null : value
    if (key) {
      const validate = this.definitions[key].validate
      if (validate) assertThat(_value, validate)
    }
    await this.db.push(this.prefix(key), _value, true)
    if (save) await this.db.save()
  }
  async reset(key?: string, save = true) {
    await this.db.push(this.prefix(key), this.default(key), true)
    if (save) await this.db.save()
  }
  async edit() {
    await this.initialize()
    const original = (await this.get()) as JsonObject
    const json = JSON.stringify(original, null, 2)
    const userInput = getUserInputFromEditorSync({
      editor: await this.get('editor'),
      content: json,
      extension: '.json',
    })
    if (!userInput || userInput === json) return
    const parsed = JSON.parse(userInput) as JsonObject
    for (const [key, value] of Object.entries(parsed)) {
      const curValue = original[key]
      let changed = false
      if ((value != null && typeof value === 'object') || (curValue != null && typeof curValue === 'object')) {
        if (JSON.stringify(value) !== JSON.stringify(curValue)) {
          changed = true
        }
      } else if (value !== curValue) {
        changed = true
      }
      if (changed) {
        await this.set(key, value, false)
      }
    }
    await this.db.save()
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any
