import os from 'os'
import path from 'path'
import { Any, JsonValue } from '@bemoje/util'
import { ArgumentBuilder } from './ArgumentBuilder'
import { assertCommandNameNotReserved } from './assertCommandNameNotReserved'
import { Base } from './Base'
import { Command, CommanderError, ErrorOptions } from 'commander'
import { CommandBuilderMetaData } from './CommandBuilderMetaData'
import { CommandFeatureSelector } from './CommandFeatureSelector'
import { getAncestors } from '../util/getAncestors'
import { getARGV } from '../util/getARGV'
import { getGlobalOptions } from './getGlobalOptions'
import { IConfigDefinePropertyOptions } from '../../types/IDefinePropertyOptions'
import { initializeCommand } from './initializeCommand'
import { IPresetPartial } from '../../types/IPreset'
import { JsonFile } from '../db/JsonFile'
import { objDestroy } from '../util/objDestroy'
import { OptionBuilder } from './OptionBuilder'
import { OutputManager } from './OutputManager'
import { prefixString } from '../util/prefixString'
import { realizeLazyProperty } from '../util/realizeLazyProperty'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder extends Base {
  static dataDirectory = path.join(os.homedir(), 'config', 'cli')

  readonly $: Command
  readonly parent: CommandBuilder | null
  readonly meta: CommandBuilderMetaData
  readonly get: CommandReader
  readonly features: CommandFeatureSelector

  constructor(name: string, callback?: (cmd: CommandBuilder) => void, parent: CommandBuilder | null = null) {
    super()
    this.$ = new Command(name)
    this.parent = parent
    if (this.parent) this.parent.$.addCommand(this.$)
    this.meta = new CommandBuilderMetaData()
    this.get = new CommandReader(this)
    this.features = new CommandFeatureSelector(this)
    initializeCommand(this, callback)
  }

  get db() {
    return realizeLazyProperty(this, 'db', new JsonFile(this))
  }

  get name() {
    return this.$.name()
  }

  version(string: string) {
    this.$.version(string)
    return this
  }
  alias(alias: string) {
    assertCommandNameNotReserved(alias)
    this.$.alias(alias)
    return this
  }
  aliases(...aliases: string[]) {
    aliases.forEach((a) => this.alias(a))
    return this
  }
  get isRoot() {
    return !this.parent
  }
  get arguments() {
    return this.$.registeredArguments
  }
  get options() {
    return this.$.options
  }
  enableBuiltinOptions(options?: {
    help?: true
    debug?: true
    disableColor?: true
    disableStderr?: true
    disableStdout?: true
  }) {
    if (!options || options.help) this.globalOption('-h, --help', 'show help')
    if (!options || options.debug) this.globalOption('-D, --debug', 'Output debugging information.')
    if (!options || options.disableColor) this.globalOption('-C, --disable-color', 'Disable color in terminal output.')
    if (!options || options.disableStderr) this.globalOption('-E, --disable-stderr', 'Mute all output to stderr.')
    if (!options || options.disableStdout) this.globalOption('-O, --disable-stdout', 'Mute all output to stdout.')
  }
  outputHelp() {
    this.$.help()
  }
  /**
   * Display error message and exit (or call exitOverride).
   */
  outputUserError(message: string, options?: ErrorOptions) {
    this.$.error(message, options)
  }

  description(...lines: string[]) {
    const description = lines.join('\n')
    const summary = description.split(/(\. ?|\n|$)/)[0]
    this.$.summary(summary + '.')
    this.$.description(description)
    return this
  }
  allowExcessArguments(bool = true) {
    this.$.allowExcessArguments(bool)
    return this
  }
  allowUnknownOption(bool = true) {
    this.$.allowUnknownOption(bool)
    return this
  }
  /**
   * Register callback to use as replacement for calling process.exit.
   */
  exitOverride(callback?: (err: CommanderError) => never | void): this {
    this.$.exitOverride(callback)
    return this
  }

  get root() {
    if (this.isRoot) return this as CommandBuilder
    return getAncestors(this).pop() as CommandBuilder
  }

  /**
   * Display error message and exit (or call exitOverride).
   */
  outputDebugInfo(event: string, getProps: () => Record<string, unknown> = () => ({})) {
    OutputManager.getInstance().outputDebug(() => ({ cmd: prefixString(this), event, ...getProps() }))
  }

  hideGlobalOptions(...names: string[]) {
    const globals = getGlobalOptions(this)
    names = names.length ? names : globals.map((opt) => opt.attributeName())
    for (const name of names) {
      if (!name) continue
      let found = false
      for (const opt of globals) {
        if (opt.attributeName() === name) {
          this.meta.hiddenGlobalOptions.add(opt)
          found = true
          break
        }
      }
      if (!found) throw new Error(`Unknown global option name: ${name} for command, ${this.name}`)
    }
    return this
  }
  unhideGlobalOptions(...names: string[]) {
    const globals = getGlobalOptions(this)
    names = names.length ? names : globals.map((opt) => opt.attributeName())
    for (const name of names) {
      if (!name) continue
      let found = false
      for (const opt of globals) {
        if (opt.attributeName() === name) {
          this.meta.hiddenGlobalOptions.delete(opt)
          found = true
          break
        }
      }
      if (!found) throw new Error(`Unknown global option name: ${name} for command, ${this.name}`)
    }
    return this
  }
  argument(name: string, description?: string): this
  argument(name: string, cb: (opt: ArgumentBuilder, cmd: this) => void): this
  argument(name: string, cb?: string | ((arg: ArgumentBuilder, cmd: this) => void)): this {
    const ins = new ArgumentBuilder(this, name)
    this.$.addArgument(ins.$)
    if (typeof cb === 'function') {
      cb(ins, this)
    } else if (typeof cb === 'string') {
      ins.description(cb)
    }
    objDestroy(ins)
    return this
  }
  option(flags: string, description?: string): this
  option(flags: string, cb?: (opt: OptionBuilder, cmd: this) => void): this
  option(flags: string, cb?: string | ((opt: OptionBuilder, cmd: this) => void)): this {
    const ins = new OptionBuilder(this, flags)
    this.$.addOption(ins.$)
    if (typeof cb === 'function') {
      cb(ins, this)
    } else if (typeof cb === 'string') {
      ins.description(cb)
    }
    objDestroy(ins)
    return this
  }
  globalOption(flags: string, description?: string): this
  globalOption(flags: string, cb?: (opt: OptionBuilder, cmd: this) => void): this
  globalOption(flags: string, cb?: string | ((opt: OptionBuilder, cmd: this) => void)): this {
    return this.option(flags, (ins) => {
      const opt = ins.get.option
      this.meta.globalOptions.push(opt)
      if (typeof cb === 'function') {
        cb(ins, this)
      } else if (typeof cb === 'string') {
        ins.description(cb)
      }
      if (opt.hidden) this.meta.hiddenGlobalOptions.add(opt)
    })
  }
  command(name: string, cb: (cmd: CommandBuilder) => void): this {
    this.meta.subcommands.push(new CommandBuilder(name, cb, this))
    return this
  }
  nativeCommand(name: string, cb: (cmd: CommandBuilder) => void): this {
    return this.command(name, (ins) => {
      ins.meta.isNative = true
      if (cb) cb(ins)
    })
  }
  action<T extends (...args: Any[]) => Promise<void>>(fn: T): this {
    this.meta.actionHandler = fn
    return this
  }
  config(key: string, entry: IConfigDefinePropertyOptions<JsonValue>) {
    this.features.config()
    this.db.config.defineProperty(key, entry)
    return this
  }
  preset(name: string, preset: IPresetPartial) {
    this.features.presets()
    this.db.presets.defineProperty(name, {
      description: preset.description,
      presets: preset.presets ?? [],
      args: preset.args ?? [],
      options: preset.options ?? {},
    })
    return this
  }
  createMain() {
    return async (argv: string[] = process.argv.slice(2)) => {
      await this.$.parseAsync(getARGV(argv), { from: 'user' })
    }
  }
}

export function CLI(name: string, callback: (cmd: CommandBuilder) => void) {
  return new CommandBuilder(name, callback)
}

export class CommandReader extends Base {
  constructor(protected readonly cmd: CommandBuilder) {
    super()
  }
  get action() {
    return this.cmd.$.builder.meta.actionHandler
  }
  get description() {
    return this.cmd.$.description()
  }
  get summary() {
    return this.cmd.$.summary()
  }
  get version() {
    return this.cmd.$.version()
  }
  get alias() {
    return this.cmd.$.alias()
  }
  get aliases() {
    return this.cmd.$.aliases()
  }
  get renderHelp() {
    return this.cmd.$.helpInformation()
  }
}
