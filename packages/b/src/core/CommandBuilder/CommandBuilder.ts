import EventEmitter from 'events'
import os from 'os'
import path from 'path'
import { actionWrapper } from './actionWrapper'
import { addDefaultGlobalOptions } from './addDefaultGlobalOptions'
import { addPresetsCommands } from './addPresetsCommands'
import { Any, JsonValue } from '@bemoje/util'
import { ArgumentBuilder } from './ArgumentBuilder'
import { autoAssignMissingOptionFlags } from '../util/autoAssignMissingOptionFlags'
import { autoAssignSubCommandAliasesRecursive } from '../util/autoAssignSubCommandAliasesRecursive'
import { Command, Option, OptionValues } from 'commander'
import { CommandBuilderBase } from './CommandBuilderBase'
import { ConfigFile } from './ConfigFile'
import { initializeHelp } from '../util/initializeHelp'
import { IPreset } from '../../cli/bFindIn/lib/core/preset/IPreset'
import { OptionBuilder } from './OptionBuilder'
import { parseArgs } from '../util/parseArgs'
import { parseOptions } from '../util/parseOptions'
import { prefixArray } from '../util/prefixArray'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { TStringParser } from '../../parsers/TStringParser'
import { walkAncestors } from '../util/walkAncestors'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder extends CommandBuilderBase {
  static readonly commandToBuilderMap = new WeakMap<Command, CommandBuilder>()
  readonly argParsers: TStringParser<JsonValue>[] = []
  readonly optParsers: Record<string, TStringParser<JsonValue>> = {}
  readonly optValidators: Record<string, TConfigValidator<JsonValue>> = {}
  readonly subcommands: CommandBuilder[] = []
  readonly globalOptions = new Set<Option>()
  readonly ignoreGlobalOptions = new Set<Option>()
  readonly selectedPresets: string[] = []
  isPreset = false
  isPresetRelatedCommand = false
  isConfig = false

  constructor(name: string, callback?: (cmd: CommandBuilder) => void, parent: CommandBuilder | null = null) {
    super(name, parent)
    CommandBuilder.commandToBuilderMap.set(this.$, this)
    initializeHelp(this)
    this.$.action(actionWrapper(this))
    addDefaultGlobalOptions(this)
    if (callback) callback(this)
    addPresetsCommands(this)
    autoAssignMissingOptionFlags(this)
    autoAssignSubCommandAliasesRecursive(this)
  }

  get events() {
    return realizeLazyProperty(this, 'events', new EventEmitter({ captureRejections: true }))
  }

  getGlobalOptions(): Option[] {
    const globals = new Set<Option>()
    for (const anc of walkAncestors<CommandBuilder>(this)) {
      for (const gopt of anc.globalOptions) {
        globals.add(gopt)
      }
    }
    return Array.from(globals)
  }

  getAllOptions(): Option[] {
    return this.$.options.concat(this.getGlobalOptions())
  }

  get filepath() {
    return path.join(os.homedir(), 'config', 'cli', prefixArray(this).join('-')) + '.json'
  }
  get db() {
    return realizeLazyProperty(this, 'db', new ConfigFile(this))
  }

  get argsParsed() {
    return parseArgs(this, this.$.args)
  }
  get optsParsed() {
    return parseOptions(this, this.$.opts())
  }
  get optsWithGlobalsParsed() {
    const gKeys = this.getGlobalOptions().map((opt) => opt.attributeName())
    const oKeys = new Set(Object.keys(this.$.opts()))
    const result = this.$.optsWithGlobals()
    for (const key of Object.keys(result)) {
      if (oKeys.has(key) || gKeys.includes(key)) continue
      delete result[key]
    }
    return parseOptions(this, result)
  }

  argument(name: string, cb?: (arg: ArgumentBuilder, cmd: CommandBuilder) => void): this {
    const ins = new ArgumentBuilder(name)
    this.$.addArgument(ins.$)
    if (cb) cb(ins, this)
    this.argParsers.push(ins.customArgParser)
    return this
  }
  option(flags: string, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    const ins = new OptionBuilder(flags)
    return this.configureOption(ins, cb)
  }
  globalOption(flags: string, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    const ins = new OptionBuilder(flags)
    this.globalOptions.add(ins.$)
    return this.configureOption(ins, cb)
  }
  protected configureOption(ins: OptionBuilder, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    this.$.addOption(ins.$)
    if (cb) cb(ins, this)
    if (ins.customArgParser) this.optParsers[ins.$.attributeName()] = ins.customArgParser
    if (ins.customArgValidator) this.optValidators[ins.$.attributeName()] = ins.customArgValidator
    return this
  }
  command(name: string, cb?: (cmd: CommandBuilder) => void): this {
    this.subcommands.push(new CommandBuilder(name, cb, this))
    return this
  }
  action(fn: (...args: Any[]) => Promise<void>): this {
    this.actionHandler = fn.bind(this)
    return this
  }
  config<O extends JsonValue>(entry: IConfigEntry<O>) {
    this.db.config.definitions[entry.key] = entry
    return this
  }
  preset<O extends OptionValues>(name: string, preset: IPreset<O>) {
    this.db.presets.definitions[name] = preset
    return this
  }
  exportCommand(): Command {
    return this.$
  }
  exportMain() {
    const $ = this.$
    return async function main(argv: string | string[] = []) {
      if (process.argv.slice(2).length) argv = process.argv.slice(2)
      else if (typeof argv === 'string') argv = argv.split(' ')
      await $.parseAsync(argv, { from: 'user' })
    }
  }
}

export type TConfigValidator<O extends JsonValue = JsonValue> = (value: O) => boolean | string

export type TConfigParser<O extends JsonValue> = (value: string) => O

export interface IConfigEntry<O extends JsonValue = JsonValue> {
  key: string
  description: string
  defaultValue: O | null
  parse: TStringParser<O | null>
  validate: TConfigValidator<O> | null
}
