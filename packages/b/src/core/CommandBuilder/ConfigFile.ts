import fs from 'fs-extra'
import { addConfigCommands } from './addConfigCommands'
import { addPresetsCommands } from './addPresetsCommands'
import {
  Any,
  assertThat,
  isObject,
  JsonObject,
  JsonValue,
  readJsonFile,
  readJsonFileSync,
  writeJsonFile,
  XtError,
} from '@bemoje/util'
import { CommandBuilder, IConfigEntry } from './CommandBuilder'
import { Config, JsonDB } from 'node-json-db'
import { defaultOpenInEditorCommand } from '../util/defaultOpenInEditorCommand'
import { getUserInputFromEditorSync } from '../util/getUserInputFromEditorSync'
import { IPreset, IPresets } from '../../cli/bFindIn/lib/core/preset/IPreset'
import { isString } from '../../validators/isString'
import { OptionValues } from 'commander'
import { parseString } from '../../parsers/parseString'
import { realizeLazyProperty } from '../util/realizeLazyProperty'

export class JsonConfigFileError extends XtError {}

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
    const value = realizeLazyProperty(this, 'config', new ConfigSection(this, 'config'))
    addConfigCommands(this.parent)
    return value
  }
  get presets() {
    const value = realizeLazyProperty(this, 'presets', new PresetsSection(this, 'presets'))
    addPresetsCommands(this.parent)
    return value
  }
}

export class Section {
  protected readonly parent: ConfigFile
  protected readonly name: string
  protected readonly prefixBase: string
  constructor(parent: ConfigFile, name: string) {
    this.parent = parent
    this.name = name
    this.prefixBase = 'data.' + name
  }
  get db() {
    return this.parent.db
  }
  protected prefix(key?: string) {
    return this.prefixBase + (key ? '.' + key : '')
  }
  async has(key?: string) {
    return await this.db.exists(this.prefix(key))
  }
  async save() {
    await this.db.save()
    const filepath = this.parent.parent.filepath
    const parsed = await readJsonFile(filepath)
    await writeJsonFile(filepath, parsed, { spaces: 2 })
  }
  async delete(key?: string) {
    await this.db.delete(this.prefix(key))
    await this.save()
  }
  getSync<T = unknown>(key?: string): T {
    const filepath = this.parent.parent.filepath
    if (!fs.existsSync(filepath)) throw new JsonConfigFileError(`No file at: '${filepath}'`)
    const file = readJsonFileSync(filepath) as JsonObject
    if (!file) throw new JsonConfigFileError(`Could not parse invalid JSON: '${filepath}'.`)
    const section = file[this.name] as JsonObject
    if (!section) return {} as T
    if (key) return section[key] as T
    return section as T
  }
}

/**
 * A section of the config file.
 */
export class ConfigSection extends Section {
  readonly definitions: Record<string, IConfigEntry<Any>> = {}

  constructor(parent: ConfigFile, name: string) {
    super(parent, name)
    if (name === 'config') {
      this.definitions['editor'] = {
        key: 'editor',
        description: 'application launch command for your preferred text editor.',
        defaultValue: defaultOpenInEditorCommand(),
        parse: parseString,
        validate: null,
      }
    }
  }

  defaultsObject(): JsonObject {
    const result: Record<string, JsonValue> = {}
    for (const [key, value] of Object.entries(this.definitions)) {
      result[key] = value.defaultValue
    }
    return result
  }

  protected override prefix(key?: string) {
    if (key && !this.definitions[key]) {
      throw new JsonConfigFileError(`No config entry with key '${key}'`)
    }
    return super.prefix(key)
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
    if (save) await this.save()
  }

  async reset(key?: string, save = true) {
    await this.db.push(this.prefix(key), this.default(key), true)
    if (save) await this.save()
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
    await this.save()
  }
}

/**
 *
 */
export class PresetsSection extends Section {
  readonly definitions: IPresets
  private isInitialized = false

  constructor(parent: ConfigFile, name: string) {
    super(parent, name)
    const cb = this.parent.parent
    this.definitions = {
      defaults: {
        summary: 'all other presets inherit from this preset',
        presets: [],
        args: cb.registeredArguments.map((arg) => arg.defaultValue || ''),
        options: cb.getAllOptions().reduce((acc, opt) => {
          acc[opt.attributeName()] = opt.defaultValue || (opt.isBoolean() ? false : null)
          return acc
        }, {} as OptionValues),
      },
    }
  }

  async initialize(save = true) {
    const data = await this.db.getObjectDefault<IPresets>(this.prefix(), this.definitions)
    const presets = Object.assign({}, this.definitions, data)
    this.definitions.defaults.args.map((arg, i) => {
      if (presets.defaults.args[i] === undefined) presets.defaults.args[i] = arg
    })
    presets.defaults.options = Object.assign({}, this.definitions.defaults.options, presets.defaults.options)
    await this.db.push(this.prefix(), presets, true)
    if (save) await this.save()
    this.isInitialized = true
  }

  async get<T extends IPreset = IPreset, K extends string | undefined = string | undefined>(
    key?: K
  ): Promise<K extends string ? T : Record<string, T>> {
    type R = K extends string ? T : Record<string, T>
    if (!this.isInitialized) await this.initialize()
    return await this.db.getObjectDefault<R>(this.prefix(key), (key ? this.definitions[key] : this.definitions) as Any)
  }

  async set<T extends IPreset>(key: string, value: T, save = true) {
    if (!this.isInitialized) await this.initialize()
    assertThat(value.summary, isString)
    assertThat(value.args, Array.isArray)
    value.args.forEach((arg) => assertThat(arg, isString))
    assertThat(value.options, isObject)
    // validate value.options
    await this.db.push(this.prefix(key), value, true)
    if (save) await this.save()
  }

  async edit() {
    if (!this.isInitialized) await this.initialize()
    const original = (await this.get()) as IPresets
    const json = JSON.stringify(original, null, 2)
    const userInput = getUserInputFromEditorSync({
      editor: await this.parent.config.get('editor'),
      content: json,
      extension: '.json',
    })
    if (!userInput || userInput === json) return
    const parsed = JSON.parse(userInput) as IPresets
    if (!parsed['defaults']) throw new JsonConfigFileError('Missing "defaults" preset')
    for (const [key, value] of Object.entries(parsed)) {
      const curValue = original[key]
      if (JSON.stringify(value) !== JSON.stringify(curValue)) {
        await this.set(key, value, false)
      }
    }
    for (const key of Object.keys(original)) {
      if (!Object.hasOwn(parsed, key)) {
        await this.db.delete(this.prefix(key))
      }
    }
    await this.initialize()
  }
}
