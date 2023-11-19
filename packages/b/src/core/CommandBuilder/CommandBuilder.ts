import EventEmitter from 'events'
import os from 'os'
import path from 'path'
import { actionWrapper } from './actionWrapper'
import { addConfigCommands } from './addConfigCommands'
import { ArgumentBuilder } from './ArgumentBuilder'
import { autoAssignMissingOptionFlags } from '../util/autoAssignMissingOptionFlags'
import { autoAssignSubCommandAliases } from '../util/autoAssignSubCommandAliases'
import { Command, Option, OptionValues } from 'commander'
import { CommandBuilderBase } from './CommandBuilderBase'
import { ConfigFile } from './ConfigFile'
import { forEachChildRecursive } from '../util/forEachChildRecursive'
import { initializeHelp } from './initializeHelp'
import { JsonValue } from '@bemoje/util'
import { OptionBuilder } from './OptionBuilder'
import { parseOptions } from '../util/parseOptions'
import { prefixArray } from '../util/prefixArray'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { TStringParser } from '../../parsers/TStringParser'
import { walkAncestors } from '../util/walkAncestors'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder extends CommandBuilderBase {
  static commandToBuilderMap = new WeakMap<Command, CommandBuilder>()

  readonly argParsers: TStringParser<JsonValue>[] = []
  readonly optParsers: Record<string, TStringParser<JsonValue>> = {}
  readonly subcommands: CommandBuilder[] = []
  readonly globalOptions = new Set<Option>()
  readonly ignoreGlobalOptions = new Set<Option>()
  actionHandler: (this: CommandBuilder, args: JsonValue[], opts: OptionValues, cmdb: CommandBuilder) => Promise<void>

  constructor(name: string, callback?: (cmd: CommandBuilder) => void, parent: CommandBuilder | null = null) {
    super(name, parent)
    CommandBuilder.commandToBuilderMap.set(this.$, this)

    if (!parent)
      this.globalOption('-Q, --quiet', (o) => {
        o.description(
          'Minimuze output. In stdout, any confirmation, status or other unnecessary messages are muted. This is useful when piping.'
        )
      })
    if (!parent)
      this.globalOption('-S, --silent', (o) => {
        o.description('Mute stderr and enable --quiet.')
        o.$.implies({ quiet: true })
      })
    if (!parent)
      this.globalOption('-DR, --dry-run', (o) => {
        o.description(
          'Simulate command without making changes. If the command does not perform any mutable actions, this flag has no effect.'
        )
        o.$.implies({ quiet: true })
      })
    if (!parent)
      this.globalOption('-T, --trace', (o) => {
        o.description(
          'Output debugging information while only simulating actually running the command (enables --dry-run.)'
        )
        o.implies({ dryRun: true })
      })
    if (!parent)
      this.globalOption('-D, --debug', (o) => {
        o.description('Output debugging information. (enables --dry-run.)')
        o.description('Output debugging output.')
      })

    this.actionHandler = async () => this.$.help()
    this.$.action(actionWrapper.call(this))

    if (callback) callback(this)

    autoAssignMissingOptionFlags(this)
    initializeHelp.call(this)
    if (!parent) forEachChildRecursive(this, autoAssignSubCommandAliases, { includeSelf: true })
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

  get filepath() {
    return path.join(os.homedir(), 'config', 'cli', prefixArray(this).join('-')) + '.json'
  }
  get db() {
    return realizeLazyProperty(this, 'db', new ConfigFile(this))
  }
  get isConfigInitialized() {
    return Object.hasOwn(this, 'userconfig')
  }
  get userconfig() {
    addConfigCommands(this)
    return realizeLazyProperty(this, 'userconfig', this.db.config)
  }

  get argsParsed() {
    return this.$.args.map((arg, i) => {
      const lastIndex = this.$.registeredArguments.length - 1
      const prev = i === 0 ? '' : this.$.args[i - 1]
      const parserIndex = i > lastIndex ? lastIndex : i
      const parse = this.argParsers[parserIndex]
      if (typeof parse !== 'function') return arg
      const retval = parse(arg, prev)
      return retval
    })
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
    this.$.addOption(ins.$)
    if (cb) cb(ins, this)
    if (ins.customArgParser) this.optParsers[this.$.name()] = ins.customArgParser
    return this
  }
  globalOption(flags: string, cb?: (opt: OptionBuilder, cmd: CommandBuilder) => void): this {
    const ins = new OptionBuilder(flags)
    this.globalOptions.add(ins.$)
    this.$.addOption(ins.$)
    if (cb) cb(ins, this)
    if (ins.customArgParser) this.optParsers[this.$.name()] = ins.customArgParser
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
    this.userconfig.definitions[entry.key] = entry
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any

export type TConfigValidator<O extends JsonValue = JsonValue> = (value: O) => boolean

export type TConfigParser<O extends JsonValue> = (value: string) => O

export interface IConfigEntry<O extends JsonValue = JsonValue> {
  key: string
  description: string
  defaultValue: O | null
  parse: TStringParser<O | null>
  validate: TConfigValidator<O> | null
}

// interface IPreset {
//   name: string
//   summary: string
//   args: string[]
//   options: Record<string, string>
// }

// interface IPresets {
//   defaults: IPreset
//   [name: string]: IPreset
// }
