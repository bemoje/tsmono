import isAsyncFunction from 'is-async-function'
import os from 'os'
import path from 'path'
import {
  AddHelpTextPosition,
  Argument,
  Command,
  CommanderError,
  ErrorOptions,
  HelpConfiguration,
  HookEvent,
  InvalidArgumentError,
  Option,
  OptionValues,
  OptionValueSource,
} from 'commander'
import {
  Any,
  arrAssign,
  arrLast,
  arrSome,
  assertThat,
  colors,
  defaultOpenInEditorCommand,
  ensureThat,
  formatTableForTerminal,
  isObject,
  JsonValue,
  objAssign,
  setNonEnumerable,
} from '@bemoje/util'
import { ArgumentBuilder } from '../arg/ArgumentBuilder'
import { CommandBuilderMetaData } from './CommandBuilderMetaData'
import { CommandFeatureSelector } from './CommandFeatureSelector'
import { countInstance } from '../core/counter'
import { DefaultHelpConfig } from './DefaultHelpConfig'
import { IAppDataDefinePropertyOptions } from '../types/IAppDataDefinePropertyOptions'
import { IConfigDefinePropertyOptions } from '../types/IConfigDefinePropertyOptions'
import { IPreset, IPresetPartial } from '../types/IPreset'
import { isArray } from '../validators/isArray'
import { isString } from '../validators/isString'
import { isStringArray } from '../validators/isStringArray'
import { isStringWithNoSpacesOrDashes } from '../validators/isStringWithNoSpacesOrDashes'
import { JsonFile } from '../db/JsonFile'
import { OptionBuilder } from '../opt/OptionBuilder'
import { optionUtils } from '../opt/optionUtils'
import { OutputManager } from '../core/OutputManager'
import { overrideCommanderPrototyper } from '../proto/Command'
import { splitCombinedArgvShorts } from '../core/splitCombinedArgvShorts'
export * from 'commander'

/**
 * Wrapper around the @see Command class, for more intuitive construction.
 */
export class CommandBuilder {
  static readonly commanderBackRefs = new WeakMap<Command, CommandBuilder>()
  static dataDirectory = path.join(os.homedir(), 'config', 'cli')
  static isTestMode = false
  static testMode() {
    CommandBuilder.isTestMode = true
    CommandBuilder.dataDirectory = path.join(os.tmpdir(), 'config', 'cli')
  }

  protected readonly features = new CommandFeatureSelector(this)
  readonly parent: CommandBuilder | null = null
  readonly $: Command
  readonly meta = new CommandBuilderMetaData()
  readonly db = new JsonFile(this)

  constructor(name: string, parent?: CommandBuilder) {
    countInstance(CommandBuilder)
    this.$ = new Command(name)
    CommandBuilder.commanderBackRefs.set(this.$, this)
    if (parent) {
      this.parent = parent
      this.parent.meta.subcommands.push(this)
      this.parent.$.addCommand(this.$)
      this.inheritParentSettings()
    }
    this.initializeActionWrapper()
    this.initializeHelp()
    if (CommandBuilder.isTestMode) {
      this.throwInsteadOfProcessExit()
      this.errorHandler((err) => {
        throw err
      })
    }
  }

  throwInsteadOfProcessExit() {
    this.exitOverride((err) => {
      throw err
    })
  }

  initializeCommand(callback?: (cmd: CommandBuilder) => void) {
    if (this.meta.isInitialized) return this
    this.meta.isInitialized = true
    if (callback) callback(this)
    if (!this.isNative) {
      this.assertCommandNameNotReserved(this.name)
      this.addUtilCommands()
    }
    if (this.isRoot) {
      this.forEachChildRecursive((cmd) => cmd.finalizeCommand(), { includeSelf: true })
    }
    return this
  }
  version(string: string) {
    this.$.version(string)
    return this
  }

  description(...lines: string[]) {
    const description = lines.join('\n')
    const summary = description.split(/(\. ?|\n|$)/)[0]
    this.$.summary(summary + '.')
    this.$.description(description)
    return this
  }

  alias(alias: string) {
    this.assertCommandNameNotReserved(alias)
    this.$.alias(alias)
    return this
  }
  aliases(...aliases: string[]) {
    aliases.forEach((alias) => this.assertCommandNameNotReserved(alias))
    this.$.aliases(aliases)
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
    return this
  }
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
    const ins = new CommandBuilder(name, this)
    ins.initializeCommand(cb)
    return this
  }
  nativeCommand(name: string, cb: (cmd: CommandBuilder) => void): this {
    const ins = new CommandBuilder(name, this)
    ins.meta.isNative = true
    ins.initializeCommand(cb)
    return this
  }
  action<T extends (...args: Any[]) => void | Promise<void>>(fn: T): this {
    Object.defineProperty(this.meta, 'actionHandler', { value: fn, configurable: true })
    return this
  }
  errorHandler(fn: (this: Command, error: unknown, cmd: CommandBuilder) => void) {
    Object.defineProperty(this.meta, 'errorHandler', { value: fn, configurable: true })
    return this
  }
  appData(key: string, entry: IAppDataDefinePropertyOptions<JsonValue>) {
    this.features.appData(true)
    this.db.appData.defineProperty(key, entry)
    return this
  }
  config(key: string, entry: IConfigDefinePropertyOptions<JsonValue>) {
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
  autoAssignMissingOptionFlagsEnabled(boolean = true) {
    this.features.autoAssignMissingOptionFlags(boolean)
  }
  autoAssignSubCommandAliasesEnabled(boolean = true) {
    this.features.autoAssignSubCommandAliases(boolean)
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
  /**
   * Add hook for life cycle event.
   */
  hook(event: HookEvent, listener: (thisCommand: Command, actionCommand: Command) => void | Promise<void>): this {
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
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   */
  addHelpText(position: AddHelpTextPosition, text: string) {
    this.$.addHelpText(position, text)
    return this
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
      if (!found) throw new Error(`Unknown global option name: ${name} for command, ${this.name}`)
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

  get isNative() {
    return this.meta.isNative
  }

  get name() {
    return this.$.name()
  }
  /**
   * Get the command at the root of the command tree.
   */
  get root() {
    if (this.isRoot) return this as CommandBuilder
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
    return this.meta.subcommands.some((c) => !!c.meta.subcommands.length)
  }
  /**
   * Returns whether a command's last argument is variadic.
   */
  get hasVariadicArguments() {
    if (!this.arguments.length) return false
    return arrLast(this.arguments as Argument[]).variadic
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

  getJsonFilepath() {
    return path.join(CommandBuilder.dataDirectory, this.root.name) + '.json'
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

  /**
   * Returns a command's and its children's prefix strings.
   */
  getPrefixStringsRecursive(filter?: (prefix: string, cmd: CommandBuilder) => boolean) {
    const result: string[][] = []
    for (const c of this.walkChildren({ includeSelf: true })) {
      const prefix = c.getPrefixString()
      if (filter && !filter(prefix, c)) continue
      result.push([prefix, c.getSummary()])
    }
    return result
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

  forEachChildRecursive(
    callback: (cmd: CommandBuilder) => void | true,
    options?: { includeSelf?: boolean }
  ): void | true {
    if (options?.includeSelf && callback(this)) return true
    for (const sub of this.meta.subcommands) {
      if (callback(sub) || sub.forEachChildRecursive(callback)) {
        return true
      }
    }
  }

  *walkChildren(options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
    if (options?.includeSelf) yield this
    for (const sub of this.meta.subcommands) {
      yield sub
      yield* sub.walkChildren()
    }
  }

  getChildren(options?: { includeSelf?: boolean }) {
    return [...this.walkChildren(options)]
  }

  *walkAncestors(options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
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
    return [...this.walkAncestors(options)]
  }

  *walkSiblings() {
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
    return [...this.walkSiblings()]
  }
  getClosestNonNativeParent() {
    for (const anc of this.walkAncestors({ includeSelf: true })) {
      if (!anc.isNative) return anc
    }
    throw new Error('No non-native parent found')
  }

  /**
   * Display error message and exit (or call exitOverride).
   */
  outputError(message: string, options?: ErrorOptions) {
    this.$.error(message, options)
  }

  renderHelp() {
    return this.$.helpInformation()
  }

  /**
   * Output help information for this command.
   */
  outputHelp() {
    console.log(this.renderHelp())
  }

  /**
   * Display error message and exit (or call exitOverride).
   */
  outputDebugInfo(event: string, getProps: () => Record<string, unknown> = () => ({})) {
    OutputManager.getInstance().outputDebug(() => ({ event, cmd: this.getPrefixString(), ...getProps() }))
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  /////////////////////////////////////////

  parseArguments(args: string[]) {
    const last = this.arguments.length - 1
    return args.map((arg, i) => {
      if (!arg) return arg
      const parse = this.meta.argParsers[i > last ? last : i]
      return parse ? parse(arg) : arg
    })
  }

  /**
   * Parses (and validates) options using the parsers defined in the command builder.
   */
  parseOptions(opts: OptionValues) {
    for (const [key, value] of Object.entries(opts)) {
      const parse = this.meta.optParsers[key]
      opts[key] = parse ? parse(value) : value
    }
    return opts
  }

  getOptsWithGlobalsParsed() {
    return this.parseOptions(this.$.optsWithGlobals())
  }

  getParsedValidArgsOptsWithPresets(): [Any[], OptionValues] {
    const [presetArgs, presetOpts, presetOrder] = this.getPresetArgsAndOpts()
    const args = this.getParsedValidArgsWithPresets(presetArgs)
    const opts = this.getParsedValidOptsWithPresets(presetOpts)
    this.debugLogArgsOpts(args, opts, presetArgs, presetOpts, presetOrder)
    return [args, opts]
  }

  getParsedValidArgsWithPresets<T>(presetArgs: T[][]) {
    const result: T[] = arrAssign([], ...presetArgs, this.parseArguments(this.$.args))
    this.combineVariadicArgs(result)
    this.assertValidArguments(result)
    return this.padArgsWithUndefinedUntilExpectedLength(result)
  }

  getParsedValidOptsWithPresets(presetOpts: OptionValues[]) {
    const parsed = this.getOptsWithGlobalsParsed()
    const opts = presetOpts.length ? objAssign({}, ...presetOpts, parsed) : parsed
    this.deleteOptionsWithDefaultOrNoValue(opts)
    this.assertValidOptions(opts)
    return opts
  }

  getPresetArgsAndOpts(): [presetArgs: string[][], presetOpts: OptionValues[], presetOrder: string[]] {
    if (!this.features.isPresetsEnabled) return [[], [], []]
    const presets = this.db.presets.getAll()
    const opts = this.$.optsWithGlobals()
    const selectedPresets = Object.keys(presets).filter((name) => opts[name] === true)
    const presetOrder = Object.keys(opts).filter((key) => selectedPresets.includes(key))
    const presetArgs: string[][] = presetOrder.map((name) => presets[name].args)
    const presetOpts: OptionValues[] = presetOrder.map((name) => presets[name].options)
    return [presetArgs, presetOpts, presetOrder]
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
        assertThat(value, isValid)
      }
    }
    return parsedOptions
  }

  assertValidPreset(key: string, preset: IPreset) {
    const { description, presets, args, options } = preset
    assertThat(key, isStringWithNoSpacesOrDashes)
    assertThat(description, isString)
    assertThat(presets, isStringArray)
    assertThat(args, isArray)
    this.assertPresetArgsOptional(args)
    this.assertValidArguments(args)
    assertThat(options, isObject)
    this.assertValidOptions(options)
  }

  protected combineVariadicArgs(result: Any[]) {
    if (this.hasVariadicArguments && result.length && !Array.isArray(arrLast(result))) {
      const rest = result.splice(this.arguments.length - 1)
      result.push(rest.filter((arg) => arg != null))
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
        this.outputDebugInfo('parsePresets', () => ({ presetOrder, presetArgs, presetOpts }))
      }
      this.outputDebugInfo('parseArgsOpts', () => {
        return {
          args,
          opts,
          command: [this.root.name, ...this.meta.rawArgs].join(' '),
        }
      })
    }
  }

  protected deleteOptionsWithDefaultOrNoValue(opts: OptionValues) {
    const names = new Set(this.getOwnAndGlobalOptions().map((o) => o.attributeName()))
    for (const [key, value] of Object.entries(opts)) {
      if (!names.has(key) || value === false || value == null) {
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
        throw new Error(`Cannot preset required arguments.`)
      }
    })
  }

  protected finalizeCommand() {
    if (this.features.isAutoAssignSubCommandAliasesEnabled) {
      this.autoAssignSubCommandAliases()
      this.assertNoDuplicateCommandNames()
    }

    if (this.features.isAutoAssignMissingOptionFlagsEnabled) {
      this.autoAssignMissingOptionFlags()
      this.assertNoDuplicateOptionNames()
    }
  }

  protected addUtilCommands() {
    if (!this.hasGrandChildren && !this.features.isConfigEnabled && !this.features.isPresetsEnabled) {
      return
    }

    this.nativeCommand('util', (util) => {
      util.alias('u')
      util.description('Utility commands.')
      const cmd = util.getClosestNonNativeParent()
      if (cmd.features.isConfigEnabled) {
        util.nativeCommand('config', createConfigCommand)
      }
      if (cmd.features.isPresetsEnabled && cmd.meta.hasCustomActionHandler) {
        util.nativeCommand('presets', createPresetsCommand)
      }
      if (cmd.hasGrandChildren) {
        util.nativeCommand('list', createUtilListCommand)
      }
      if (cmd.features.isConfigEnabled || cmd.features.isPresetsEnabled) {
        util.nativeCommand('filepath', createUtilFilepathCommand)
      }

      function createUtilFilepathCommand(fp: CommandBuilder) {
        fp.alias('f')
        fp.description('Print filepath to JSON file containing user data, eg. config and presets.')
        fp.action(async (opts: OptionValues, fp: CommandBuilder) => {
          const cmd = fp.getClosestNonNativeParent()
          console.log(cmd.getJsonFilepath())
        })
      }

      function createUtilListCommand(list: CommandBuilder) {
        list.alias('l')
        list.description('List nested subcommands.')
        list.option('--all', 'Include utility commands.')
        list.action(async (opts: { all?: boolean }, list: CommandBuilder) => {
          const cmd = list.getClosestNonNativeParent()
          const filter = opts.all
            ? undefined
            : (prefix: string) => {
                return !/ (config|presets|util)( .+)?$/gi.test(prefix)
              }
          const table = cmd.getPrefixStringsRecursive(filter)
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

      function createPresetsCommand(presets: CommandBuilder) {
        presets.alias('p')
        presets.description(
          'Edit presets in your text editor',
          '',
          'A preset consists of pre-set arguments and/or options for a command.',
          'Additionally, a preset can have other presets as dependencies.',
          'When running the command, multiple presets can be stacked.',
          'Required arguments cannot be pre-set.'
        )
        presets.nativeCommand('edit', (edit) => {
          edit.alias('e')
          edit.description('Edit as JSON in a text editor.')
          edit.option('--editor [cmd]', (e) => {
            e.description('The command to launch your preferred text editor.')
            e.default(defaultOpenInEditorCommand())
          })
          edit.action(async (opts: { editor: string }, edit: CommandBuilder) => {
            const cmd = edit.getClosestNonNativeParent()
            cmd.db.presets.edit(opts.editor)
            console.info(cmd.db.presets.getAll())
          })
        })
        presets.nativeCommand('list', (list) => {
          list.alias('l')
          list.description('List all presets.')
          list.action(async (opts: OptionValues, list: CommandBuilder) => {
            const cmd = list.getClosestNonNativeParent()
            console.dir(cmd.db.presets.getAll(), { depth: null })
          })
        })

        const cmd = presets.getClosestNonNativeParent()
        const section = cmd.db.presets
        for (const [name, preset] of Object.entries(section.getAll())) {
          if (name === 'defaults') continue
          cmd.option(`--${name}`, (opt) => {
            opt.description('[Preset]: ' + preset.description)
            opt.implies(
              presetGetImpliedPresetNames(cmd, name).reduce((acc, key) => {
                acc[key] = true
                return acc
              }, {} as OptionValues)
            )
          })
        }

        function presetGetImpliedPresetNames(cmd: CommandBuilder, presetName: string) {
          const result = new Set(['defaults'])
          const recurse = (preset: string) => {
            if (result.has(preset)) return
            result.add(preset)
            cmd.db.presets.get(preset).presets.forEach((key) => recurse(key))
          }
          recurse(presetName)
          return [...result]
        }
      }

      function createConfigCommand(config: CommandBuilder) {
        config.alias('c')
        config.description('Manage configuration file.')
        config.nativeCommand('edit', (edit) => {
          edit.alias('e')
          edit.description('Edit as JSON in a text editor.')
          edit.option('--editor [cmd]', (e) => {
            e.description('The command to launch your preferred text editor.')
            e.default(defaultOpenInEditorCommand())
          })
          edit.action(async (opts: { editor: string }, edit: CommandBuilder) => {
            const cmd = edit.getClosestNonNativeParent()
            cmd.db.config.edit(opts.editor)
            console.info(cmd.db.config.getAll())
          })
        })
        config.nativeCommand('list', (list) => {
          list.alias('l')
          list.description('Print entire config with values, descriptions and defaults.')
          list.action(async (opts: OptionValues, list: CommandBuilder) => {
            const cmd = list.getClosestNonNativeParent()
            console.dir(
              cmd.db.config.keys.map((key: string) => {
                return {
                  key,
                  description: cmd.db.config.descriptions[key],
                  value: cmd.db.config.get(key),
                  defaultValue: cmd.db.config.defaultValues,
                }
              })
            )
          })
        })
        config.nativeCommand('get', (get) => {
          get.alias('g')
          get.description('Print value(s) from the config.')
          get.argument('[key]', (a) => {
            a.description('The key to print the value of. Omit to print all values.')
            a.choices(a.cmd.db.config.keys)
          })
          get.action(async (key: string, opts: OptionValues, get: CommandBuilder) => {
            const cmd = get.getClosestNonNativeParent()
            if (key) console.log(cmd.db.config.get(key))
            else console.log(cmd.db.config.getAll())
          })
        })
        config.nativeCommand('set', (set) => {
          set.alias('s')
          set.description('Set a value in the config.')
          set.argument('<key>', (a) => {
            a.description('The key to set the value of.')
            a.choices(a.cmd.db.config.keys)
          })
          set.argument('<value>', (a) => a.description('The new value.'))
          set.action(async (key: string, value: string, opts: OptionValues, set: CommandBuilder) => {
            const cmd = set.getClosestNonNativeParent()
            const from = cmd.db.config.get(key)
            const parse = cmd.db.config.parsers[key]
            const to = typeof parse === 'function' ? cmd.db.config.parsers[key](value) : value
            cmd.db.config.set(key, to)
            console.info({ changed: key, from, to })
          })
        })
        config.nativeCommand('reset', (reset) => {
          reset.alias('r')
          reset.description('Reset to defaults.')
          reset.argument('[key]', (a) => {
            a.description('The key for which to reset the value. Omit to reset entire config.')
            a.choices(a.cmd.db.config.keys)
          })
          reset.action(async (key: string, opts: OptionValues, reset: CommandBuilder) => {
            const cmd = reset.getClosestNonNativeParent()
            if (key) cmd.db.config.reset(key)
            else cmd.db.config.resetAll()
            console.info(cmd.db.config.getAll())
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
  protected autoAssignSubCommandAliases() {
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
  protected autoAssignMissingOptionFlags() {
    const taken = new Set<string>()
    for (const anc of this.walkAncestors({ includeSelf: true })) {
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
        optionUtils.setShort(opt, char)
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
        optionUtils.setShort(opt, char)
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
    for (const anc of this.walkAncestors({ includeSelf: true })) {
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
    for (const anc of this.walkAncestors()) {
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
  protected initializeActionWrapper() {
    this.$.action(function actionWrapperSync(this: Command) {
      const cmd = this.builder as CommandBuilder
      const isAsync = isAsyncFunction(cmd.meta.actionHandler)
      if (isAsync) {
        return new Promise((resolve, reject) => {
          try {
            cmd.handleOutputOptions()
            const [args, opts] = cmd.getParsedValidArgsOptsWithPresets()
            if (opts['help']) resolve(cmd.outputHelp())
            else resolve(cmd.meta.actionHandler.call(this, ...args, opts, cmd))
          } catch (error) {
            this.builder.meta.errorHandler.call(this, error, this.builder)
            reject(error)
          }
        })
      } else {
        try {
          cmd.handleOutputOptions()
          const [args, opts] = cmd.getParsedValidArgsOptsWithPresets()
          if (opts['help']) return cmd.outputHelp()
          cmd.meta.actionHandler.call(this, ...args, opts, cmd)
        } catch (error) {
          this.builder.meta.errorHandler.call(this, error, this.builder)
        }
      }
    })
  }

  protected initializeHelp() {
    this.globalOption('-h, --help', 'show help')
    this.$.addHelpCommand('?', 'show help')
    this.$.configureHelp(DefaultHelpConfig)
  }

  protected inheritParentSettings() {
    if (!this.parent) return
    const cmdr = this.$
    if (cmdr.parent) cmdr.copyInheritedSettings(cmdr.parent)
    this.features.inheritFrom(this.parent.features)
    for (const opt of this.parent.meta.hiddenGlobalOptions) {
      this.meta.hiddenGlobalOptions.add(opt)
    }
  }

  protected assertCommandNameNotReserved(name: string) {
    if (this.meta.isNative) return
    if (name === 'u' || name === 'util') {
      throw new Error(`Name '${name}' is reserved and is not available as name or alias.`)
    }
  }
}

overrideCommanderPrototyper()
process.argv = splitCombinedArgvShorts(process.argv.slice())
