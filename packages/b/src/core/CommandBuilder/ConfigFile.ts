import fs from 'fs-extra'
import { addConfigCommands } from './addConfigCommands'
import { addPresetsCommands } from './addPresetsCommands'
import {
  Any,
  assertThat,
  isObject,
  JsonObject,
  JsonValue,
  promptUserEditJsonInTextEditor,
  promptUserEditJsonInTextEditorSync,
  readJsonFile,
  readJsonFileSafeSync,
  readJsonFileSync,
  writeJsonFile,
  writeJsonFileSafeSync,
  XtError,
} from '@bemoje/util'
import { CommandBuilder, IConfigEntry } from './CommandBuilder'
import { Config, JsonDB } from 'node-json-db'
import { defaultOpenInEditorCommand } from '../../../../util/src/os/defaultOpenInEditorCommand'
import { IPreset, IPresets } from '../../cli/bFindIn/lib/core/preset/IPreset'
import { isString } from '../../validators/isString'
import { OptionValues } from 'commander'
import { parseCommaDelimitedString } from '../../parsers/parseCommaDelimitedString'
import { parseString } from '../../parsers/parseString'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { validateOptions } from '../util/validateOptions'

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
    return realizeLazyProperty(this, 'presets', new PresetsSection(this, 'presets'))
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
  async delete(key?: string, save = true) {
    await this.db.delete(this.prefix(key))
    if (save) await this.save()
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
      this.definitions['disabledBuiltinPresets'] = {
        key: 'disabledBuiltinPresets',
        description: 'List of disabled builtin presets.',
        defaultValue: [],
        parse: parseCommaDelimitedString,
        validate: function isStringArray(value: string[]) {
          return value.every((v) => isString(v))
        },
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
    const editor = (await this.get('editor')) as string
    const parsed = promptUserEditJsonInTextEditor(original, editor)
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
          acc[opt.attributeName()] = opt.defaultValue ?? (opt.isBoolean() ? false : null)
          return acc
        }, {} as OptionValues),
      },
    }
  }

  initializeSync() {
    if (this.isInitialized) return
    const data = readJsonFileSafeSync(this.parent.parent.filepath) as {
      presets?: IPresets
      config?: { disabledBuiltinPresets?: string[] }
    }
    const presets = data && data.presets ? Object.assign({}, this.definitions, data.presets) : this.definitions
    const config = data?.config ?? {}
    const disabled: string[] = config?.disabledBuiltinPresets ?? []
    this._initialize(presets, disabled)
    if (this.isInitialized) return
    writeJsonFileSafeSync(this.parent.parent.filepath, { config, presets }, { spaces: 2 })
    this.isInitialized = true
  }

  async initialize() {
    if (this.isInitialized) return
    const data = await this.db.getObjectDefault<IPresets>(this.prefix(), this.definitions)
    const presets = Object.assign({}, this.definitions, data)
    const disabled: string[] = await this.parent.config.get('disabledBuiltinPresets')
    this._initialize(presets, disabled)
    if (this.isInitialized) return
    await this.db.push(this.prefix(), presets, true)
    await this.save()
    this.isInitialized = true
  }

  protected _initialize(presets: IPresets, disabled: string[]) {
    // merge args
    this.definitions.defaults.args.forEach((arg, i) => {
      if (presets.defaults.args[i] === undefined) presets.defaults.args[i] = arg
    })
    // merge default options
    presets.defaults.options = Object.assign({}, this.definitions.defaults.options, presets.defaults.options)
    // remove disabled presets
    for (const name of disabled) {
      if (Object.hasOwn(presets, name)) {
        delete presets[name]
      }
    }
    for (const [name, preset] of Object.entries(presets)) {
      // find and remove invalid options
      for (const key of Object.keys(preset.options)) {
        if (!Object.hasOwn(this.definitions.defaults.options, key)) {
          delete preset.options[key]
          console.warn(`In preset, ${name}, deleted invalid option: '${key}'`)
        }
      }
      // find and remove invalid preset references
      preset.presets = preset.presets.filter((key) => {
        const bool = Object.hasOwn(presets, key)
        if (!bool) console.warn(`In preset, ${key}, deleted invalid reference to other preset: '${key}'`)
        return bool
      })
      // validate
      this.validatePreset(preset)
    }
  }

  async getAll(): Promise<IPresets> {
    if (!this.isInitialized) await this.initialize()
    return await this.db.getObjectDefault<IPresets>(this.prefix(), this.definitions)
  }

  async get(name: string): Promise<IPreset> {
    if (!this.isInitialized) await this.initialize()
    return await this.db.getObjectDefault<IPreset>(this.prefix(name), this.definitions[name])
  }

  validatePreset(preset: IPreset) {
    assertThat(preset.summary, isString)
    assertThat(preset.args, Array.isArray)
    preset.args.forEach((arg) => assertThat(arg, isString))
    assertThat(preset.presets, Array.isArray)
    preset.presets.forEach((pre) => assertThat(pre, isString))
    assertThat(preset.options, isObject)
    validateOptions(this.parent.parent, preset.options)
  }

  async set(name: string, preset: IPreset, save = true) {
    if (!this.isInitialized) await this.initialize()
    this.validatePreset(preset)
    await this.db.push(this.prefix(name), preset, true)
    if (save) await this.save()
  }

  async setAll(presets: IPresets) {
    if (!this.isInitialized) await this.initialize()
    if (!presets['defaults']) throw new JsonConfigFileError('Missing "defaults" preset')
    const original = await this.getAll()
    for (const [name, preset] of Object.entries(presets)) {
      if (JSON.stringify(preset) === JSON.stringify(original[name])) continue
      await this.set(name, preset, false)
    }
    for (const name of Object.keys(original)) {
      if (Object.hasOwn(presets, name)) continue
      await this.delete(name, false)
    }
    await this.save()
  }

  async edit() {
    if (!this.isInitialized) await this.initialize()
    const original = await this.getAll()
    const editor = (await this.parent.config.get('editor')) as string
    const parsed = await promptUserEditJsonInTextEditor(original as unknown as JsonValue, editor)
    await this.setAll(parsed as unknown as IPresets)
  }

  override async delete(name: string, save = true) {
    if (!this.isInitialized) await this.initialize()
    if (name === 'defaults') throw new JsonConfigFileError('Cannot delete the "defaults" preset.')
    await super.delete(name, save)
    if (this.definitions[name] === undefined) return
    const disabled: string[] = await this.parent.config.get('disabledBuiltinPresets')
    if (disabled.includes(name)) return
    await this.parent.config.set('disabledBuiltinPresets', disabled.concat(name))
  }
}
