import EventEmitter from 'events'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { actionWrapper } from './actionWrapper'
import { addConfigCommands } from './addConfigCommands'
import { addDefaultGlobalOptions } from './addDefaultGlobalOptions'
import { addPresetsCommands } from './addPresetsCommands'
import { addUtilCommands } from './addUtilCommands'
import { Any, assertThat, JsonValue } from '@bemoje/util'
import { ArgumentBuilder } from './ArgumentBuilder'
import { autoAssignMissingOptionFlagsRecursive } from '../util/autoAssignMissingOptionFlags'
import { autoAssignSubCommandAliasesRecursive } from '../util/autoAssignSubCommandAliasesRecursive'
import { Command, Option } from 'commander'
import { CommandBuilderBase } from './CommandBuilderBase'
import { getAncestors } from '../util/getAncestors'
import { getChildren } from '../util/getChildren'
import { getRootCommand } from '../util/getRootCommand'
import { IConfigDefinePropertyOptions } from '../../types/IDefinePropertyOptions'
import { initializeHelp } from '../util/initializeHelp'
import { IPresetPartial } from '../../types/IPreset'
import { JsonFile } from '../db/JsonFile'
import { OptionBuilder } from './OptionBuilder'
import { parseArguments } from '../util/parseArguments'
import { parseOptions } from '../util/parseOptions'
import { prefixArray } from '../util/prefixArray'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { TConfigValidator } from '../../types/TConfigValidator'
import { TStringParser } from '../../types/TStringParser'
import { walkAncestors } from '../util/walkAncestors'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder extends CommandBuilderBase {
  protected static readonly commandToBuilderMap = new WeakMap<Command, CommandBuilder>()
  static register(cmd: Command, builder: CommandBuilder) {
    this.commandToBuilderMap.set(cmd, builder)
  }
  static find(cmd: Command): CommandBuilder {
    const ins = this.commandToBuilderMap.get(cmd)
    if (!ins) throw new Error(`CommandBuilder not found for command ${cmd.name()}`)
    return ins
  }

  static dataDirectory = path.join(os.homedir(), 'config', 'cli')

  readonly argParsers: TStringParser<JsonValue>[] = []
  readonly optParsers: Record<string, TStringParser<JsonValue>> = {}
  readonly argValidators: TConfigValidator<JsonValue>[][] = []
  readonly optValidators: Record<string, TConfigValidator<JsonValue>[]> = {}
  readonly subcommands: CommandBuilder[] = []
  readonly globalOptions = new Set<Option>()
  readonly ignoreGlobalOptions = new Set<Option>()
  readonly selectedPresets: string[] = []
  isPreset = false
  isPresetsEnabled = false
  isConfigEnabled = false

  constructor(name: string, callback?: (cmd: CommandBuilder) => void, parent: CommandBuilder | null = null) {
    super(name, parent)
    CommandBuilder.register(this.$, this)

    initializeHelp(this)
    actionWrapper(this)
    addDefaultGlobalOptions(this)

    if (callback) callback(this)

    enablePresetsIfFoundInJsonFile(this)
    addUtilCommands(this)
    addConfigCommands(this)
    addPresetsCommands(this)

    autoAssignMissingOptionFlagsRecursive(this)
    autoAssignSubCommandAliasesRecursive(this)
  }

  get filepath() {
    return path.join(CommandBuilder.dataDirectory, prefixArray(this).join('-')) + '.json'
  }
  get db() {
    return realizeLazyProperty(this, 'db', new JsonFile(this))
  }

  enableConfig() {
    if (!this.isRoot) getRootCommand(this).enableConfig()
    this.isConfigEnabled = true
    return this
  }
  enablePresets() {
    this.enableConfig()
    this.isPresetsEnabled = true
    return this
  }
  disableConfig() {
    this.isConfigEnabled = false
    return this
  }
  disablePresets() {
    this.isPresetsEnabled = false
    return this
  }
  get args() {
    return this.$.args
  }
  get opts() {
    return this.$.opts()
  }
  get argsParsed() {
    return parseArguments(this, this.$.args)
  }
  get optsParsed() {
    return parseOptions(this, this.$.opts())
  }
  get optsWithGlobalsParsed() {
    return optsWithGlobalsParsed(this)
  }
  disableGlobalOptions(names?: string[]) {
    return disableGlobalOptions(this, names)
  }

  argument(name: string, cb?: (arg: ArgumentBuilder, cmd: CommandBuilder) => void): this {
    const ins = new ArgumentBuilder(name)
    this.$.addArgument(ins.get.argument)
    if (cb) cb(ins, this)
    this.argParsers.push(ins.get.parser)
    this.argValidators.push(ins.get.validators)
    return this
  }
  option(flags: string, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    const ins = new OptionBuilder(flags)
    assertThat(this, isOptionNameAvailable, true, ins)
    this.$.addOption(ins.get.option)
    if (cb) cb(ins, this)
    if (ins.get.parser) this.optParsers[ins.get.attributeName] = ins.get.parser
    if (ins.get.validators.length) {
      const name = ins.get.attributeName
      if (!this.optValidators[name]) this.optValidators[name] = []
      this.optValidators[name].push(...ins.get.validators)
    }
    return this
  }
  globalOption(flags: string, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    return this.option(flags, (ins) => {
      this.globalOptions.add(ins.get.option)
      if (cb) cb(ins, this)
    })
  }
  command(name: string, cb?: (cmd: CommandBuilder) => void): this {
    this.subcommands.push(new CommandBuilder(name, cb, this))
    return this
  }
  action(fn: (...args: Any[]) => Promise<void>): this {
    this.actionHandler = fn.bind(this)
    return this
  }
  config(key: string, entry: IConfigDefinePropertyOptions<JsonValue>) {
    this.enableConfig()
    this.db.config.defineProperty(key, entry)
    return this
  }
  preset(name: string, preset: IPresetPartial) {
    this.enablePresets()
    this.db.presets.defineProperty(name, {
      description: preset.description,
      presets: preset.presets ?? [],
      args: preset.args ?? [],
      options: preset.options ?? {},
    })
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

export function isOptionNameAvailable(cmd: CommandBuilder, ob: OptionBuilder) {
  for (const c of getAncestors(cmd, { includeSelf: true }).concat(getChildren(cmd))) {
    for (const opt of c.$.options) {
      if (opt.short && ob.get.short === opt.short) return false
      if (opt.long && ob.get.long === opt.long) return false
      if (opt.attributeName() && ob.get.attributeName === opt.attributeName()) return false
    }
  }
  return true
}

export function disableGlobalOptions(cmd: CommandBuilder, names?: string[]) {
  const globals = getGlobalOptions(cmd)
  names = names || globals.map((opt) => opt.name())
  for (const name of names) {
    for (const opt of globals) {
      if (opt.name() === name || opt.attributeName() === name) {
        cmd.ignoreGlobalOptions.add(opt)
      }
    }
  }
  return cmd
}

export function getGlobalOptions(cmd: CommandBuilder): Option[] {
  const result: Option[] = []
  for (const anc of walkAncestors(cmd, { includeSelf: true })) {
    for (const gopt of anc.globalOptions) {
      if (!cmd.ignoreGlobalOptions.has(gopt)) {
        result.push(gopt)
      }
    }
  }
  return result
}

export function getAllOptions(cmd: CommandBuilder): Option[] {
  return cmd.$.options.concat(getGlobalOptions(cmd))
}

export function optsWithGlobalsParsed(cmd: CommandBuilder) {
  const result = cmd.$.optsWithGlobals()
  return parseOptions(cmd, result)
}

export function enablePresetsIfFoundInJsonFile(cmd: CommandBuilder) {
  if (!cmd.isPresetsEnabled && !cmd.isPreset && fs.existsSync(cmd.filepath) && cmd.db.db.has('presets'))
    cmd.enablePresets()
}
