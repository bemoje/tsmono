/* eslint-disable @typescript-eslint/ban-types */
import colors from 'ansi-colors'
import fs from 'fs-extra'
import isAsyncFunction from 'is-async-function'
import os from 'os'
import path from 'path'
import type { Any } from '@bemoje/util'
import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { arrAssign } from '@bemoje/util'
import { arrLast } from '@bemoje/util'
import { arrSome } from '@bemoje/util'
import { CommandBuilderMetaData } from './CommandBuilderMetaData'
import { CommandFeatureSelector } from './CommandFeatureSelector'
import { DefaultHelpConfig } from './DefaultHelpConfig'
import { ensureThat } from '@bemoje/util'
import { formatTableForTerminal } from '@bemoje/util'
import type { IConfig } from '../types/IConfig'
import type { IPreset, IPresetPartial } from '../types/IPreset'
import { isArray } from '@bemoje/util'
import { isObject } from '@bemoje/util'
import { isString } from '@bemoje/util'
import { isStringArray } from '@bemoje/util'
import { isStringWithNoSpacesOrDashes } from '@bemoje/util'
import { JsonFile } from '../db/JsonFile'
import { objAssign } from '@bemoje/util'
import { OptionBuilder } from '../opt/OptionBuilder'
import { OptionHelpers } from '../opt/OptionHelpers'
import { OutputManager } from '../core/OutputManager'
import { PresetsSection } from '../db/PresetsSection'
import { realizeLazyProperty } from '@bemoje/util'
import { removeFile } from '@bemoje/util'
import { setNonEnumerable } from '@bemoje/util'
import { splitCombinedArgvShorts } from '../core/splitCombinedArgvShorts'
import {
  type AddHelpTextPosition,
  Argument,
  Command,
  CommanderError,
  type CommandUnknownOpts,
  type ErrorOptions,
  type HelpConfiguration,
  type HookEvent,
  InvalidArgumentError,
  Option,
  type OptionValues,
  type OptionValueSource,
  ParseOptions,
} from '@commander-js/extra-typings'
import { type JsonValue } from '@bemoje/util'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder<Args extends Any[] = unknown[], Opts extends OptionValues = OptionValues> {
  static dataDirectory = path.join(os.homedir(), 'config', 'cli')

  protected readonly features = new CommandFeatureSelector(this)
  readonly parent: CommandBuilder | null = null
  readonly $: Command
  readonly meta = new CommandBuilderMetaData<Args>()
  get db() {
    return realizeLazyProperty(this, 'db', new JsonFile(this))
  }

  constructor(
    name: string,
    callback?: (this: CommandBuilder<Args, Opts>, cmd: CommandBuilder<Args, Opts>) => void,
    parent?: CommandBuilder,
    isNative = false
  ) {
    this.meta.isNative = isNative
    this.$ = new Command(name)
    commanderBackRefs.set(this.$, this)

    if (parent) {
      this.parent = parent
      this.parent.meta.subcommands.push(this)
      this.parent.$.addCommand(this.$)
    }

    this.initializeHelp()

    if (callback) callback.call(this, this)

    if (this.parent) {
      this.$.copyInheritedSettings(this.parent.$)
      this.features.inheritFrom(this.parent.features)
      this.inheritParentHiddenGlobals()
    }

    if (!this.meta.isNative) {
      this.assertCommandNameNotReserved(this.name)
      this.addUtilCommands()
    }

    if (this.isRoot) {
      for (const child of this.getChildrenIterator({ includeSelf: true })) {
        if (child.features.isAutoAssignSubCommandAliasesEnabled) {
          child.assignSubCommandAliases()
          if (!child.meta.isNative) {
            child.assertNoDuplicateCommandNames()
          }
        }

        if (child.features.isAutoAssignMissingOptionFlagsEnabled) {
          child.assignMissingOptionFlags()
          if (!child.meta.isNative) {
            child.assertNoDuplicateOptionNames()
          }
        }
      }
    }
  }

  setRecommended() {
    this.enableBuiltinOptions({ debug: true, disableStderr: true, disableStdout: true })
    this.autoAssignMissingOptionFlags()
    this.autoAssignSubCommandAliases()
    this.presetsEnabled()
  }

  deleteDataFile() {
    const filepath = this.jsonFilepath
    if (fs.existsSync(filepath)) removeFile(filepath)
  }

  /**
   * Set the program version to `str`.
   *
   * This method auto-registers the "-V, --version" flag
   * which will print the version number when passed.
   *
   * You can optionally supply the  flags and description to override the defaults.
   */
  version(string: string) {
    this.$.version(string)
    const opt = this.options.find((o) => o.attributeName() === 'version')
    if (opt) this.meta.globalOptions.push(opt)
    return this
  }

  /**
   * Set the description. If more than one sentence or string is given,
   * then the first will be used as summary and the whole text as description.
   * @param lines - description lines
   */
  description(...lines: string[]) {
    const description = lines.join('\n')
    const summary = description.split(/(\. ?|\n|$)/)[0]
    this.$.summary(summary + '.')
    this.$.description(description)
    return this
  }

  /**
   * Set an alias for the command.
   * You may call more than once to add multiple aliases.
   * Only the first alias is shown in the auto-generated help.
   */
  alias(alias: string) {
    this.assertCommandNameNotReserved(alias)
    this.$.alias(alias)
    return this
  }

  /**
   * Set aliases for the command. This overwrites all previously set aliases.
   * Only the first alias is shown in the auto-generated help.
   */
  aliases(...aliases: string[]) {
    aliases.forEach((alias) => this.assertCommandNameNotReserved(alias))
    this.$.aliases(aliases)
    return this
  }

  /**
   * Set the command usage.
   */
  usage(str: string): this {
    this.$.usage(str)
    return this
  }

  enableBuiltinOptions(options?: {
    debug?: boolean
    disableColor?: boolean
    disableStderr?: boolean
    disableStdout?: boolean
  }) {
    if (!options || options.debug) this.globalOption('-D, --debug', 'Output debugging information.')
    if (!options || options.disableColor) this.globalOption('-C, --disable-color', 'Disable color in terminal output.')
    if (!options || options.disableStderr) this.globalOption('-E, --disable-stderr', 'Mute all output to stderr.')
    if (!options || options.disableStdout) this.globalOption('-O, --disable-stdout', 'Mute all output to stdout.')
    return this
  }

  /**
   * Create a new argument.
   * @param name - argument name
   * @param description - describe the argument
   * @param cb - callback to configure the argument
   */
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
    if (ins.$.variadic && !ins.hasParser && !ins.hasValidators) {
      ins.parser.string()
      ins.validator.isStringArray()
    }
    return this
  }

  /**
   * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
   * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
   * option-argument is indicated by `<>` and an optional option-argument by `[]`.
   * @example ```js
   * program
   *     .option('-p, --pepper', 'add pepper')
   *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required argument
   *     .option('-c, --cheese [CHEESE]', 'add extra cheese') // optional
   * ```
   */
  option(flags: string, description?: string): this
  option(flags: string, cb?: (opt: OptionBuilder, cmd: this) => void): this
  option(flags: string, cb?: string | ((opt: OptionBuilder, cmd: this) => void)): this {
    const ins = new OptionBuilder(this, flags)
    if (this.hasIdenticalParentOption(ins.$)) return this
    this.$.addOption(ins.$)
    if (typeof cb === 'function') {
      cb(ins, this)
    } else if (typeof cb === 'string') {
      ins.description(cb)
    }
    if (ins.$.variadic && !ins.hasParser && !ins.hasValidators) {
      ins.parser.string()
      ins.validator.isStringArray()
    }
    return this
  }

  /**
   * The same as .option() except that the option will be inherited by subcommands.
   */
  globalOption(flags: string, description?: string): this
  globalOption(flags: string, cb?: (opt: OptionBuilder, cmd: this) => void): this
  globalOption(flags: string, cb?: string | ((opt: OptionBuilder, cmd: this) => void)): this {
    return this.option(flags, (ins) => {
      const opt = ins.$
      this.meta.globalOptions.push(opt)
      if (typeof cb === 'function') {
        cb(ins, this)
      } else if (typeof cb === 'string') {
        ins.description(cb)
      }

      if (opt.hidden) this.meta.hiddenGlobalOptions.add(opt)
    })
  }

  /**
   * Create a subcommand.
   * @param flags - command name and arguments, args are  `<required>` or `[optional]` and last may also be `variadic...`
   * @param description - describe the command
   */
  command<A extends Any[] = unknown[], O extends OptionValues = OptionValues>(
    name: string,
    cb: (this: CommandBuilder<A, O>, cmd: CommandBuilder<A, O>) => void
  ): this {
    new CommandBuilder<A, O>(name, cb, this)
    return this
  }

  /**
   * Create a native subcommand.
   * @param flags - command name and arguments, args are  `<required>` or `[optional]` and last may also be `variadic...`
   * @param description - describe the command
   */
  nativeCommand<A extends Any[] = unknown[], O extends OptionValues = OptionValues>(
    name: string,
    cb: (this: CommandBuilder<A, O>, cmd: CommandBuilder<A, O>) => void
  ): this {
    new CommandBuilder<A, O>(name, cb, this, true)
    return this
  }

  /**
   * Register callback function for the command to execute when invoked.
   */
  action(fn: (...args: any[]) => void | Promise<void>): this {
    const isAsync = isAsyncFunction(fn) || /^\(.+\) ?=> ?tslib_1\.__awaiter\(/.test(fn.toString().trim())
    this.meta.isActionAsync = isAsync
    Object.defineProperty(this.meta, 'actionHandler', { value: fn, configurable: false, writable: false })
    this.initializeActionWrapper(isAsync)
    return this
  }

  usageExamples(...examples: { command: string; description?: string }[]) {
    const table = examples.map(({ command, description }) => {
      if (command.length + (description?.length || 0) > 100) {
        throw new Error(`Usage example description too long: ${command}`)
      }
      return [command, description ?? '']
    })
    this.description(this.$.description() + '\n\n' + 'Usage Examples:\n' + formatTableForTerminal(table))
    return this
  }

  errorHandler(fn: (this: Command, error: unknown, cmd: CommandBuilder<Args, Opts>) => void) {
    Object.defineProperty(this.meta, 'errorHandler', { value: fn, configurable: true })
    return this
  }

  appData(key: string, value: JsonValue) {
    this.features.appData(true)
    this.db.appData.defineProperty(key, value)
    return this
  }

  config(key: string, entry: IConfig<JsonValue>) {
    this.features.config(true)
    this.db.config.defineProperty(key, entry)
    return this
  }

  preset(name: string, preset: IPresetPartial) {
    this.features.presets()
    this.meta.presetOptionKeys.push(name)
    this.db.presets.defineProperty(name, {
      description: preset.description,
      presets: preset.presets ?? [],
      args: preset.args ?? [],
      options: preset.options ?? {},
    })
    return this
  }

  presetsEnabled(boolean = true) {
    this.features.presets(boolean)
    return this
  }

  autoAssignMissingOptionFlags(boolean = true) {
    this.features.autoAssignMissingOptionFlags(boolean)
    return this
  }

  autoAssignSubCommandAliases(boolean = true) {
    this.features.autoAssignSubCommandAliases(boolean)
    return this
  }

  /**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @returns `this` command for chaining
   */
  allowExcessArguments(bool = true) {
    this.$.allowExcessArguments(bool)
    return this
  }

  /**
   * Allow unknown options on the command line.
   *
   * @returns `this` command for chaining
   */
  allowUnknownOption(bool = true) {
    this.$.allowUnknownOption(bool)
    return this
  }

  /**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   *
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @returns `this` command for chaining
   */
  enablePositionalOptions(positional?: boolean): this {
    this.$.enablePositionalOptions(positional)
    return this
  }

  /**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   *
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @returns `this` command for chaining
   */
  passThroughOptions(passThrough?: boolean): this {
    this.$.passThroughOptions(passThrough)
    return this
  }

  /**
   * Register callback to use as replacement for calling process.exit.
   */
  exitOverride(callback?: (err: CommanderError) => never | void): this {
    this.$.exitOverride(callback)
    return this
  }

  /**
   * Add hook for life cycle event.
   */
  hook(
    event: HookEvent,
    listener: (thisCommand: CommandUnknownOpts, actionCommand: CommandUnknownOpts) => void | Promise<void>
  ): this {
    this.$.hook(event, listener)
    return this
  }

  /**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   */
  configureHelp(configuration: HelpConfiguration): this {
    this.$.configureHelp(configuration)
    return this
  }

  /**
   * Display the help or a custom message after an error occurs.
   */
  showHelpAfterError(displayHelp?: boolean | string): this {
    this.$.showHelpAfterError(displayHelp)
    return this
  }

  /**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   */
  showSuggestionAfterError(displaySuggestion?: boolean): this {
    this.$.showSuggestionAfterError(displaySuggestion)
    return this
  }

  /**
   * Override default decision whether to add implicit help command.
   * @example ```
   * addHelpCommand() // force on
   * addHelpCommand(false); // force off
   * addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
   * ```
   * @returns `this` command for chaining
   */
  addHelpCommand(enableOrNameAndArgs?: string | boolean, description?: string): this {
    this.$.addHelpCommand(enableOrNameAndArgs, description)
    return this
  }

  /**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   */
  addHelpText(position: AddHelpTextPosition, text: string) {
    this.$.addHelpText(position, text)
    return this
  }

  throwCommanderError(message: string, exitCode = 1, type = 'error'): never {
    throw new CommanderError(exitCode, type, message)
  }

  hideGlobalOptions(...names: string[]) {
    const globals = this.getGlobalOptions()
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
    const globals = this.getGlobalOptions()
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

      if (!found) this.throwCommanderError(`Unknown global option name: ${name} for command, ${this.name}`)
    }

    return this
  }

  /**
   * Set the directory for searching for executable subcommands of this command.
   */
  executableDir(path: string): this {
    this.$.executableDir(path)
    return this
  }

  /**
   * Store option value.
   */
  setOptionValue(key: string, value: unknown): this {
    this.$.setOptionValue(key, value)
    return this
  }

  /**
   * Store option value and where the value came from.
   */
  setOptionValueWithSource(key: string, value: unknown, source: OptionValueSource): this {
    this.$.setOptionValueWithSource(key, value, source)
    return this
  }

  setDataFilepath(filepath: string) {
    Object.defineProperty(this, 'dataFilepath', { value: filepath })
    if (Object.hasOwn(this, 'db') && Object.hasOwn(this.db, 'db')) {
      this.db.db.setFilepath(filepath)
    }
  }

  /**
   * Display error message and exit (or call exitOverride).
   */
  outputError(message: string, options?: ErrorOptions) {
    this.$.error(message, options)
  }

  /**
   * Output help information for this command.
   */
  outputHelp() {
    console.log(this.getHelpInformation())
  }

  /**
   * Display error message and exit (or call exitOverride).
   */
  outputDebugMessage(event: string, getProps: () => Record<string, unknown> = () => ({})) {
    OutputManager.getInstance().outputDebug(() => ({ event, cmd: this.getPrefixString(), ...getProps() }))
  }

  parseArguments(args: string[]) {
    const last = this.arguments.length - 1
    return args.map((arg, i) => {
      if (!arg) return arg
      const parse = this.meta.argParsers[i > last ? last : i]
      return parse ? (Array.isArray(arg) ? arg.map((a) => parse(a)) : parse(arg)) : arg
    })
  }

  /**
   * Parses (and validates) options using the parsers defined in the command builder.
   */
  parseOptions(opts: OptionValues) {
    for (const [key, value] of Object.entries(opts)) {
      const parse = this.meta.optParsers[key]
      opts[key] = parse ? (Array.isArray(value) ? value.map((o) => parse(o)) : parse(value as string)) : value
    }

    return opts
  }

  /**
   * Validate ALREADY PARSED args using the validators defined in the command builder.
   */
  assertValidArguments(parsedArgs: Any[]) {
    const last = this.arguments.length - 1
    parsedArgs.forEach((arg, i) => {
      if (arg == null) return
      const index = i > last ? last : i
      const validators = this.meta.argValidators[index]
      if (!validators) return
      for (const isValid of validators) {
        ensureThat(arg, isValid, { Err: InvalidArgumentError })
      }
    })
    return parsedArgs
  }

  /**
   * Validate ALREADY PARSED options using the validators defined in the command builder.
   */
  assertValidOptions(parsedOptions: OptionValues) {
    for (const [key, value] of Object.entries(parsedOptions)) {
      if (!this.meta.optValidators[key]) continue
      if (value == null) continue
      for (const isValid of this.meta.optValidators[key]) {
        ensureThat(value, isValid)
      }
    }

    return parsedOptions
  }

  assertValidPreset(key: string, preset: IPreset) {
    const { description, presets, args, options } = preset
    ensureThat(key, isStringWithNoSpacesOrDashes)
    ensureThat(description, isString)
    ensureThat(presets, isStringArray)
    ensureThat(args, isArray)
    this.assertPresetArgsOptional(args)
    this.assertValidArguments(args)
    ensureThat(options, isObject)
    this.assertValidOptions(options)
  }

  throwRatherThanExitProcess() {
    const throwError = (error: unknown) => {
      throw error
    }
    this.errorHandler(throwError)
    this.exitOverride(throwError)
  }

  get name() {
    return this.$.name()
  }

  /**
   * Get the command at the root of the command tree.
   */
  get root(): CommandBuilder {
    if (this.isRoot) return this
    return this.getAncestors().pop() as CommandBuilder
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

  get commander() {
    return this.$
  }

  get hasGrandChildren() {
    return this.meta.subcommands.some((sub) => !!sub.meta.subcommands.length)
  }

  /**
   * Returns whether a command's last argument is variadic.
   */
  get isLastArgVariadic() {
    if (!this.arguments.length) return false
    return arrLast(this.arguments as Argument[]).variadic
  }

  get jsonFilepath() {
    return path.join(CommandBuilder.dataDirectory, this.root.name + '.json')
  }

  /**
   * Get the executable search directory.
   */
  getExecutableDir(): string | null {
    return this.$.executableDir()
  }

  /**
   * Retrieve option value.
   */
  getOptionValue(key: string): Any {
    return this.$.getOptionValue(key)
  }

  /**
   * Get source of option value.
   */
  getOptionValueSource(key: string): OptionValueSource | undefined {
    return this.$.getOptionValueSource(key)
  }

  /**
   * Get source of option value. See also .optsWithGlobals().
   */
  getOptionValueSourceWithGlobals(key: string): OptionValueSource | undefined {
    return this.$.getOptionValueSourceWithGlobals(key)
  }

  getActionHandler() {
    return this.meta.actionHandler
  }

  getDescription() {
    return this.$.description()
  }

  getSummary() {
    return this.$.summary()
  }

  getVersion() {
    return this.$.version()
  }

  getAlias() {
    return this.$.alias()
  }

  getAliases() {
    return this.$.aliases()
  }

  /**
   * Get a commands prefix array based on all its parent/ancestor commands.
   */
  getPrefixArray(): string[] {
    return this.getAncestors({ includeSelf: true })
      .reverse()
      .map((node) => node.name)
  }

  /**
   * Get a commands prefix string based on all its parent/ancestor commands.
   */
  getPrefixString() {
    return this.getPrefixArray().join(' ')
  }

  getGlobalOptions(): Option[] {
    const result: Option[] = []
    for (const anc of this.getAncestors({ includeSelf: true }).reverse()) {
      for (const gopt of anc.meta.globalOptions) {
        if (!this.meta.hiddenGlobalOptions.has(gopt)) {
          result.push(gopt)
        }
      }
    }

    return result
  }

  getOwnAndGlobalOptions(): Option[] {
    return this.options.concat(this.getGlobalOptions())
  }

  *getChildrenIterator(options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
    if (options?.includeSelf) yield this
    for (const sub of this.meta.subcommands) {
      yield sub
      yield* sub.getChildrenIterator()
    }
  }

  getChildren(options?: { includeSelf?: boolean }) {
    return [...this.getChildrenIterator(options)]
  }

  *getAncestorsIterator(options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
    if (options?.includeSelf) yield this
    let node = this.parent
    while (node) {
      yield node
      node = node.parent
    }
  }

  /**
   * Get a command's ancestors, optionally starting from the command itself.
   */
  getAncestors(options?: { includeSelf?: boolean }): CommandBuilder[] {
    return [...this.getAncestorsIterator(options)]
  }

  *getSiblingsIterator() {
    if (!this.parent) return
    for (const sub of this.parent.meta.subcommands) {
      if (sub === this) continue
      yield sub
    }
  }

  /**
   * Returns an array of sibling CommandBuilder objects.
   */
  getSiblings() {
    return [...this.getSiblingsIterator()]
  }

  /**
   * Render the help string for the command.
   */
  getHelpInformation() {
    return this.$.helpInformation()
  }

  getOptsWithGlobals() {
    return this.parseOptions(this.$.optsWithGlobals())
  }

  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * ```
   * program.parse(process.argv);
   * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   * ```
   *
   * @returns `this` command for chaining
   */
  parse(argv?: readonly string[], options?: ParseOptions): this {
    this.$.parse(argv, options)
    return this
  }

  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * ```
   * program.parseAsync(process.argv);
   * program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
   * program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   * ```
   *
   * @returns Promise
   */
  async parseAsync(argv?: readonly string[], options?: ParseOptions): Promise<this> {
    await this.$.parseAsync(argv, options)
    return this
  }

  protected getParsedValidArgsOptsWithPresets(): [Any[], OptionValues] {
    const [presetArgs, presetOpts, presetOrder] = this.getPresetArgsAndOpts()
    const args = this.getParsedValidArgsWithPresets(presetArgs)
    const opts = this.getParsedValidOptsWithPresets(presetOpts)
    this.debugLogArgsOpts(args, opts, presetArgs, presetOpts, presetOrder)
    return [args, opts]
  }

  protected getParsedValidArgsWithPresets(presetArgs: Any[][]) {
    const result = arrAssign([], ...presetArgs, this.parseArguments(this.$.args))
    this.combineVariadicArgs(result)
    this.assertValidArguments(result)
    return this.padArgsWithUndefinedUntilExpectedLength(result)
  }

  protected getParsedValidOptsWithPresets(presetOpts: OptionValues[]) {
    const parsed = this.getOptsWithGlobals()
    const opts = presetOpts.length ? objAssign({}, ...presetOpts, parsed) : parsed
    this.hideOptionsWithDefaultOrNoValueOrArePresets(opts)
    this.assertValidOptions(opts)
    return opts
  }

  protected getPresetArgsAndOpts(): [presetArgs: string[][], presetOpts: OptionValues[], presetOrder: string[]] {
    if (!this.features.isPresetsEnabled) return [[], [], []]
    const presets = this.db.presets.getAll()
    const opts = this.$.optsWithGlobals()
    const selectedPresets = Object.keys(presets).filter((name) => opts[name] === true)
    const presetOrder = Object.keys(opts).filter((key) => selectedPresets.includes(key))
    const presetArgs: string[][] = presetOrder.map((name) => presets[name].args)
    const presetOpts: OptionValues[] = presetOrder.map((name) => presets[name].options)
    return [presetArgs, presetOpts, presetOrder]
  }

  protected combineVariadicArgs(result: Any[]) {
    if (this.isLastArgVariadic) {
      if (result.length && !Array.isArray(arrLast(result))) {
        const rest = result.splice(this.arguments.length - 1)
        result.push(rest.filter((arg) => arg != null))
      } else {
        result.push([])
      }
    }
    return result
  }

  protected debugLogArgsOpts(
    args: Any[],
    opts: OptionValues,
    presetArgs: string[][],
    presetOpts: OptionValues[],
    presetOrder: string[]
  ) {
    if (opts['debug']) {
      if (this.features.isPresetsEnabled) {
        this.outputDebugMessage('parsePresets', () => ({ presetOrder, presetArgs, presetOpts }))
      }

      this.outputDebugMessage('parseArgsOpts', () => {
        return {
          args,
          opts,
          command: [this.root.name, ...this.meta.rawArgs].join(' '),
        }
      })
    }
  }

  protected hideOptionsWithDefaultOrNoValueOrArePresets(opts: OptionValues) {
    const allOpts = this.getOwnAndGlobalOptions()
    const optMap = Object.fromEntries(allOpts.map((o) => [o.attributeName(), o]))
    for (const [key, value] of Object.entries(opts)) {
      if (value == null || !optMap[key] || optMap[key].defaultValue === value) {
        setNonEnumerable(opts, key)
      }
    }

    for (const key of this.meta.presetOptionKeys) {
      if (Object.hasOwn(opts, key)) {
        setNonEnumerable(opts, key)
      }
    }

    return opts
  }

  protected handleOutputOptions() {
    const opts = this.$.optsWithGlobals()
    const om = OutputManager.getInstance().reset()
    if (opts['disableColor']) om.colors.enabled = false
    if (opts['disableStderr']) om.stderr.disable()
    if (opts['disableStdout']) om.stdout.disable()
    if (opts['debug']) {
      om.debug.enable()
      om.drainDebugMessageQueue()
    }
  }

  protected padArgsWithUndefinedUntilExpectedLength(args: Any[]) {
    while (args.length < this.arguments.length) args.push(undefined)
    return args
  }

  protected assertPresetArgsOptional(args: Any[]) {
    args.forEach((arg, i) => {
      if (arg != null && i < this.arguments.length && this.arguments[i].required) {
        this.throwCommanderError(`Cannot preset required arguments.`)
      }
    })
  }

  protected addUtilCommands() {
    if (
      !this.hasGrandChildren &&
      !this.features.isConfigEnabled &&
      !this.features.isPresetsEnabled &&
      !this.features.isAppDataEnabled
    ) {
      return
    }

    this.nativeCommand('util', (u) => {
      const cmd = u.parent as CommandBuilder
      u.alias('u')
      u.description('Utility commands.')
      if (cmd.features.isConfigEnabled) {
        u.nativeCommand('config', createConfigCommand)
      }

      if (cmd.features.isPresetsEnabled && cmd.meta.hasCustomActionHandler) {
        u.nativeCommand('presets', createPresetsCommand)
      }

      if (cmd.hasGrandChildren) {
        u.nativeCommand('list', createUtilListCommand)
      }

      if (cmd.features.isConfigEnabled || cmd.features.isPresetsEnabled || cmd.features.isAppDataEnabled) {
        u.nativeCommand('filepath', createUtilFilepathCommand)
      }

      function createUtilFilepathCommand(f: CommandBuilder) {
        f.alias('f')
        f.description('Print filepath to JSON file containing user data, eg. config and presets.')
        f.action(async () => console.log(cmd.jsonFilepath))
      }

      function createUtilListCommand(l: CommandBuilder) {
        l.alias('l')
        l.description('List nested subcommands.')
        l.option('--all', 'Include utility commands.')
        l.action(async (opts: { all?: boolean }) => {
          const filter = opts.all
            ? undefined
            : (prefix: string) => {
                return !/ (config|presets|util)( .+)?$/gi.test(prefix)
              }

          const table: string[][] = []
          for (const c of cmd.getChildrenIterator({ includeSelf: true })) {
            const prefix = c.getPrefixString()
            if (filter && !filter(prefix)) continue
            table.push([prefix, c.getSummary()])
          }

          const ansi = table.map((row) => {
            const arr = row[0].split(' ')
            const last = arr.pop() as string
            let col = colors.magenta
            if (row[1].startsWith('[Preset]')) {
              col = colors.green
            } else if (/ (util|config|presets) /.test(row[0])) {
              col = colors.gray
            } else if (/ (util|config|presets)/.test(row[0])) {
              col = colors.dim
            }

            row[0] = arr.map(colors.dim).concat(col(last)).join(' ')
            return row
          })
          console.log(formatTableForTerminal(ansi, ['Command', 'Summary']))
        })
      }

      function createPresetsCommand(p: CommandBuilder) {
        const db = cmd.db.presets as PresetsSection
        p.alias('p')
        p.description(
          'Edit presets in your text editor',
          '',
          'A preset consists of pre-set arguments and/or options for a command.',
          'Additionally, a preset can have other presets as dependencies.',
          'When running the command, multiple presets can be stacked.',
          'Required arguments cannot be pre-set.'
        )
        p.nativeCommand('edit', (e) => {
          e.alias('e')
          e.description('Edit as JSON in a text editor.')
          e.option('--editor [cmd]', 'The command to launch your preferred text editor.')
          e.action(async (opts: { editor: string }) => {
            db.edit(opts.editor)
            console.info(db.getAll())
          })
        })
        p.nativeCommand('list', (l) => {
          l.alias('l')
          l.description('List all presets.')
          l.action(async () => console.dir(db.getAll(), { depth: null }))
        })
        for (const [key, preset] of Object.entries(db.getAll())) {
          if (key === 'defaults') continue
          cmd.option(`--${key}`, (o) => {
            o.description('[Preset]: ' + preset.description)
            const implied: Record<string, boolean> = { defaults: true }
            const recurse = (preset: string) => {
              if (implied[preset]) return
              implied[preset] = true
              db.get(preset).presets.forEach((k) => recurse(k))
            }

            recurse(key)
            o.implies(implied)
          })
        }
      }

      function createConfigCommand(c: CommandBuilder) {
        const db = cmd.db.config
        c.alias('c')
        c.description('Manage configuration file.')
        c.nativeCommand('edit', (e) => {
          e.alias('e')
          e.description('Edit as JSON in a text editor.')
          e.option('--editor [cmd]', 'The command to launch your preferred text editor.')
          e.action(async (opts: { editor: string }) => {
            db.edit(opts.editor)
            console.info(db.getAll())
          })
        })
        c.nativeCommand('list', (l) => {
          l.alias('l')
          l.description('Print entire config with details.')
          l.action(async () => {
            const result = db.keys.map((key: string) => ({
              key,
              description: db.descriptions[key],
              value: db.get(key),
              defaultValue: db.defaultValues,
            }))
            console.dir(result, { depth: null })
          })
        })
        c.nativeCommand('get', (g) => {
          g.alias('g')
          g.description('Print value(s) from the config.')
          g.argument('[key]', 'The key to print the value of. Omit to print all values.')
          g.action(async (key: string) => console.log(key ? db.get(key) : db.getAll()))
        })
        c.nativeCommand('set', (s) => {
          s.alias('s')
          s.description('Set a value in the config.')
          s.argument('<key>', 'The key to set the value of.')
          s.argument('<value>', 'The new value.')
          s.action(async (key: string, val: string) => {
            const parse = db.parsers[key]
            const value = typeof parse === 'function' ? parse(val) : val
            db.set(key, value)
            console.info({ [key]: value })
          })
        })
        c.nativeCommand('reset', (r) => {
          r.alias('r')
          r.description('Reset to defaults.')
          r.argument('[key]', 'The key for which to reset the value. Omit to reset entire config.')
          r.action(async (key: string) => {
            if (key) db.reset(key)
            else db.resetAll()
            console.info(db.getAll())
          })
        })
      }
    })
  }

  /**
   * Makes aliases for the command.
   * The idea is to be able to navigate the command tree by only typing the first letter(s) of the command names.
   *
   * Example: A command 'cola' would get these aliases: ['c', 'co', 'col'].
   * However, if there are namespace clashes with sibling subcommands that start with the same letter,
   * eg. like 'cola' and 'coal' where the first two letters clash, cola's aliases are reduced to only ['col'] and similarly for 'coal'.
   *
   * This method creates the aliases, ensuring there are no clashes with sublings, why it is important that the
   * entire command tree is built before invoking this method.
   */
  assignSubCommandAliases() {
    if (this.getAlias() || this.name.length <= 1) return this
    const sibAliases = this.getSiblings()
      .map((sib) => sib.getAliases())
      .flat()
    for (let i = 0; i < this.name.length - 1; i++) {
      let cmdAlias = this.name.substring(0, i + 1)
      let isClash = arrSome(sibAliases, (sibAlias) => {
        return cmdAlias === sibAlias
      })
      if (isClash && i === 0) {
        cmdAlias = cmdAlias.charAt(0).toUpperCase()
        isClash = arrSome(sibAliases, (sibAlias) => {
          return cmdAlias === sibAlias
        })
      }

      if (isClash) continue
      this.alias(cmdAlias)
      return this
    }

    return this
  }

  /**
   * Automatically set 'short' and 'long' names to options that don't have one assigned yet.
   *
   * First, it tries to assign a short name based on the first letter of the option's attribute name
   * Both lower and upper case are tried. If these is not available, the next letter of the option name is tried.
   *
   * If none of the letters of the option name are available, the option is skipped until all other
   * options have had letters from their names attempted assigned.
   * Those that remain are assigned the first available letter of the alphabet + 0-9.
   * If there are 64 options for the command and no more alphanumeric characters are available,
   * the option is not assigned a short name.
   */
  assignMissingOptionFlags() {
    const taken = new Set<string>()
    for (const anc of this.getAncestorsIterator({ includeSelf: true })) {
      anc.options.forEach((opt) => {
        if (!opt.short) return
        taken.add(opt.short.replace(/^-/g, ''))
      })
    }

    const failed = new Set<Option>()

    // assign letter from option name
    this.options.forEach((opt) => {
      if (opt.short) return
      const name = opt.attributeName()
      for (let c = 0; c < name.length; c++) {
        let char = name.charAt(c).toLowerCase()
        if (taken.has(char)) {
          char = char.toUpperCase()
          if (taken.has(char)) continue
        }

        OptionHelpers.setShort(opt, char)
        taken.add(char)
        return
      }

      failed.add(opt)
    })

    // assign random alphanumeric character.
    const name = 'abcdefghijklmnopqrstuvwxyz1234567890'
    failed.forEach((opt) => {
      for (let c = 0; c < name.length; c++) {
        let char = name.charAt(c)
        if (taken.has(char)) {
          char = char.toUpperCase()
          if (taken.has(char)) continue
        }

        OptionHelpers.setShort(opt, char)
        taken.add(char)
        return
      }
    })
  }

  protected assertNoDuplicateCommandNames() {
    const names = this.$.commands.map((sub) => sub.aliases().concat(sub.name())).flat()
    if (names.length !== new Set(names).size) {
      throw new Error(`Duplicate subcommand names/aliases found for command, ${this.name}: ${names.join(', ')}`)
    }
  }
  protected hasIdenticalParentOption(option: Option) {
    const flags = option.flags
    for (const anc of this.getAncestorsIterator({ includeSelf: true })) {
      for (const opt of anc.$.options) {
        if (flags === opt.flags) {
          return true
        }
      }
    }

    return false
  }

  protected assertNoDuplicateOptionNames() {
    const throwErr = (cmd: CommandBuilder, opt: string, anc?: CommandBuilder) => {
      throw new Error(`Duplicate option names > cmd: ${cmd.name}, ${anc ? `anc: ${anc.name}, ` : ''}opt: ${opt}`)
    }

    const set = new Set<string>()
    for (const opt of this.options) {
      if (opt.name() === 'help') continue
      if (opt.short) {
        if (set.has(opt.short)) throwErr(this, opt.short)
        set.add(opt.short)
      }

      if (opt.long) {
        if (set.has(opt.long)) throwErr(this, opt.long)
        set.add(opt.long)
      }

      if (opt.attributeName()) {
        if (set.has(opt.attributeName())) throwErr(this, opt.attributeName())
        set.add(opt.attributeName())
      }
    }

    for (const anc of this.getAncestorsIterator()) {
      for (const opt of anc.$.options) {
        if (opt.short && set.has(opt.short)) {
          if (opt.short !== 'V') continue
          throwErr(this, opt.short, anc)
        }

        if (opt.long && set.has(opt.long)) {
          throwErr(this, opt.long, anc)
        }

        if (opt.attributeName() && set.has(opt.attributeName())) {
          throwErr(this, opt.attributeName(), anc)
        }
      }
    }
  }

  protected initializeActionWrapper(isAsync = false) {
    if (isAsync) {
      this.$.action(async () => {
        try {
          this.handleOutputOptions()
          const [args, opts] = this.getParsedValidArgsOptsWithPresets()
          if (opts['help']) return this.outputHelp()
          const optswg = this.$.optsWithGlobals()
          await this.meta.actionHandler.call(this, ...(args as typeof this.$.args), opts as typeof optswg, this)
        } catch (error) {
          this.meta.errorHandler.call(this, error, this)
        }
      })
    } else {
      this.$.action(() => {
        try {
          this.handleOutputOptions()
          const [args, opts] = this.getParsedValidArgsOptsWithPresets()
          if (opts['help']) return this.outputHelp()
          type TArgs = typeof this.$.args
          const owg = this.$.optsWithGlobals()
          type TOpts = typeof owg
          this.meta.actionHandler.call(this, ...(args as TArgs), opts as TOpts, this)
        } catch (error) {
          this.meta.errorHandler.call(this, error, this)
        }
      })
    }
  }

  protected initializeHelp() {
    if (this.isRoot) this.globalOption('-h, --help', 'show help')
    this.$.addHelpCommand('?', 'show help')
    this.$.configureHelp(DefaultHelpConfig)
  }

  protected inheritParentHiddenGlobals() {
    if (!this.parent) return
    for (const opt of this.parent.meta.hiddenGlobalOptions) {
      this.meta.hiddenGlobalOptions.add(opt)
    }
  }

  protected assertCommandNameNotReserved(name: string) {
    if (this.isRoot) return
    if (this.meta.isNative) return
    if (name === 'u' || name === 'util') {
      throw new Error(`Name '${name}' is reserved and is not available as name or alias.`)
    }
  }
}

export const commanderBackRefs = new WeakMap<Command<Any, Any>, CommandBuilder<Any, Any>>()
const oldParse = Command.prototype.parse
Command.prototype.parse = function parse(this: Command, argv?: readonly string[], options?: ParseOptions) {
  if (!argv) argv = process.argv
  if (argv) {
    argv = splitCombinedArgvShorts(argv.slice())
    this.builder.meta.rawArgs = argv.slice(options?.from === 'user' ? 0 : 2)
  } else {
    this.builder.meta.rawArgs = process.argv.slice(2)
  }

  return oldParse.call(this, argv, options)
}

const oldParseAsync = Command.prototype.parseAsync
Command.prototype.parseAsync = async function (this: Command, argv?: readonly string[], options?: ParseOptions) {
  if (!argv) argv = process.argv
  if (argv) {
    argv = splitCombinedArgvShorts(argv.slice())
    this.builder.meta.rawArgs = argv.slice(options?.from === 'user' ? 0 : 2)
  } else {
    this.builder.meta.rawArgs = process.argv.slice(2)
  }

  return await oldParseAsync.call(this, argv, options)
}
Object.defineProperty(Command.prototype, 'builder', {
  get(this: Command) {
    const ins = commanderBackRefs.get(this)
    if (!ins) throw new Error(`CommandBuilder not found for command ${this.name()}`)
    return ins
  },
})

declare module '@commander-js/extra-typings' {
  interface Command {
    get builder(): CommandBuilder
  }
}

export function CLI(name: string, cb: (cmd: CommandBuilder) => void) {
  return new CommandBuilder(name, cb)
}
