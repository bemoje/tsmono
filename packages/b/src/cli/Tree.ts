import path from 'path'
import { Argument, Command } from 'commander'
import {
  arrLast,
  arrSome,
  getAppDataPath,
  JsonObject,
  JsonRawPrimitive,
  JsonValue,
  objFilter,
  objForEach,
  readDirectoryDirentsPathsSafe,
  readJsonFileSafe,
  TNonEmptyString,
  writeJsonFileSafe,
} from '@bemoje/util'
import { BHelp } from './CommandBuilder/BHelp'
import { CLI_LIST } from './list'
import { commandSearchPrompt } from '../actions/prompts/commandSearchPrompt/commandSearchPrompt'
import { organizeTreePrefixes } from './util/organizeTreePrefixes'
import { TrieMap } from '@bemoje/trie-map'

/**
 *
 */
export class CTBase {
  readonly prefixString: TNonEmptyString

  readonly prefixArray: TNonEmptyString[]
  readonly command: Command
  parent?: CTBase

  presets: CTCommandConfig

  constructor(prefixString: TNonEmptyString) {
    this.presets = { defaults: {} }
    this.prefixString = prefixString
    this.prefixArray = prefixString.split(' ')
    this.initializeTreeNode()
    this.initializePropertyAccesses()
    this.command = new Command(arrLast(this.prefixArray))
    this.initializeCommand()
  }

  get hasArguments(): boolean {
    return !!this.command.registeredArguments.length
  }

  hasVariadicRestArguments() {
    if (!this.hasArguments) return false
    const args = this.command.registeredArguments
    const lastArg = args[args.length - 1]
    const isVariadic = lastArg.variadic
    return isVariadic
  }

  appendPassThroughPassThroughArguments() {
    if (this.hasVariadicRestArguments()) return
    const arg = new Argument('[args...]', 'pass-through arguments')
    arg.argOptional().argParser((value) => value.trim().split(' '))
    this.command.addArgument(arg)
  }

  setOptions() {
    const defaults = this.getOwnAndAncestorPresetDefaultsMerged()
    const ancestorDefaults = this.getAncestorPresetDefaultsMerged()

    const parse = (value: string) => {
      value = value.trim()
      if (value === 'true') return true
      if (value === 'false') return false
      const n = Number(value)
      if (n.toString() === value) return n
      if (value === 'null') return null
      if (value == null) return null
      if (value === 'undefined') return undefined
      return value
    }

    for (const [key, value] of Object.entries(defaults)) {
      if (!(Object.hasOwn(ancestorDefaults, key) && ancestorDefaults[key] !== value)) {
        const oarg = typeof value === 'boolean' ? '' : ' <val>'
        const flags = `-${key.charAt(0)} --${key}${oarg}`
        this.command.option(flags, key, parse, value as string)
      }
    }

    for (const [key, value] of Object.entries(defaults)) {
      if (Object.hasOwn(ancestorDefaults, key) && ancestorDefaults[key] !== value) {
        const description = '[inherited] ' + key
        const oarg = typeof value === 'boolean' ? '' : ' <val>'
        const flags = `-${key.charAt(0)} --${key}${oarg}`
        this.command.option(flags, description, parse, value as string)
      }
    }
  }

  get isCommand(): boolean {
    return false
  }

  get isNode(): boolean {
    return false
  }

  get isRoot(): boolean {
    return false
  }

  get name(): string {
    return this.command.name()
  }

  get parentPrefixArray() {
    return this.prefixArray.slice(0, -1)
  }

  get trie(): TrieMap<CTBase> {
    return CTRoot.trie
  }

  protected initializeTreeNode(): void {
    CTRoot.trie.set(this.prefixArray, this)
  }
  protected initializePropertyAccesses() {
    Object.freeze(this.prefixArray)
  }
  protected initializeCommand() {
    if (!this.isRoot) {
      this.parent = this.trie.getStrict(this.parentPrefixArray)
      this.parent.command.addCommand(this.command)
    }
    this.command
      .allowUnknownOption(true)
      .allowExcessArguments(true)
      .showHelpAfterError(true)
      .showSuggestionAfterError(false)
      .addHelpCommand('?', 'help')
  }

  *iterateSiblings(): Generator<CTBase> {
    const parent = this.parent
    if (!parent) return
    for (const [node] of this.trie.iterateChildren(parent.prefixArray)) {
      if (node === this) continue
      yield node
    }
  }

  get action(): (...args: any[]) => Promise<void> {
    return async (..._args: any[]) => {
      const ancestorDefaults = this.getAncestorPresetDefaults()
      const command = this.prefixString
      const args = this.command.args
      const optionsWithGlobals = this.command.optsWithGlobals()
      const options: Partial<typeof optionsWithGlobals> = {}
      const inherited: Partial<typeof optionsWithGlobals> = {}
      objForEach(optionsWithGlobals, (value, key) => {
        if (Object.hasOwn(this.presets.defaults, key) || value !== ancestorDefaults[key]) {
          options[key] = value
        } else {
          inherited[key] = value
        }
      })
      console.log({
        command,
        args,
        options,
        inherited,
      })
    }
  }

  get subCommandList() {
    const list: string[] = ['<-']
    this.trie.forEach(this.prefixArray, (node) => {
      list.push(node.prefixString)
    })
    return list
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
  setAliases(): void {
    let isClashing = true
    const aliases = []
    for (let i = 0; i < this.name.length; i++) {
      if (isClashing) {
        const isStillClashing = arrSome([...this.iterateSiblings()], (sibling) => {
          return sibling.name.charAt(i) === this.name.charAt(i)
        })
        if (isStillClashing) continue
        else isClashing = false
      }
      const alias = this.name.substring(0, i + 1)
      if (alias === this.name) break
      aliases.push(alias)
    }
    this.command.aliases(aliases)
  }

  *iterateAncestorsFromNode() {
    let node = this.parent
    while (node) {
      yield node
      node = node.parent
    }
  }

  getAncestorsFromNode() {
    return [...this.iterateAncestorsFromNode()]
  }

  getAncestorsFromRoot() {
    return this.getAncestorsFromNode().reverse()
  }

  getOwnPresetDefaults() {
    return this.presets.defaults
  }

  getAncestorPresetDefaults() {
    return this.getAncestorsFromNode().map((ancestor) => {
      return ancestor.getOwnPresetDefaults()
    })
  }

  getOwnAndAncestorPresetDefaults() {
    return [this.getOwnPresetDefaults(), ...this.getAncestorPresetDefaults()]
  }

  /**
   * Merged defaults from the parent of this node and all ancestors.
   * @remakrs Ensures property ordering (incl. undefined/null) is from parent to root, but override order (ignoring undefined/null) is from root to parent.
   */
  getAncestorPresetDefaultsMerged() {
    const fromParent = this.getAncestorPresetDefaults()
    const fromRoot = fromParent.slice().reverse()
    const fromNodeUndefined = fromParent.map((def) => {
      return objFilter(def, (value) => value != null)
    })
    return Object.assign({}, ...fromRoot, ...fromNodeUndefined)
  }

  /**
   * Merged defaults from this node and all ancestors.
   * @remakrs Ensures property ordering (incl. undefined/null) is from node to root, but override order (ignoring undefined/null) is from root to node.
   */
  getOwnAndAncestorPresetDefaultsMerged() {
    const fromNode = this.getOwnAndAncestorPresetDefaults()
    const fromRoot = fromNode.slice().reverse()
    const fromNodeUndefined = fromNode.map((def) => {
      return objFilter(def, (value) => value != null)
    })
    return Object.assign({}, ...fromRoot, ...fromNodeUndefined)
  }
}

type TCTPreset = Record<string, JsonRawPrimitive | JsonRawPrimitive[]>
interface CTCommandConfig {
  defaults: TCTPreset
  [key: string]: TCTPreset
}

/**
 * class
 */
export class CTCommand extends CTBase {
  constructor(prefixString: TNonEmptyString) {
    super(prefixString)

    const optionKeys = [...Object.keys(this.presets)] || []
    this.presets.defaults['myCommand'] = true
    this.presets.defaults['age'] = 56

    const preset = new Command('preset')
      .description('edit, add or delete custom presets')
      .addArgument(new Argument('[action]').choices(['add', 'edit', 'delete']).default('edit'))
      .addArgument(new Argument('[name]').choices(optionKeys).default('defaults'))
      .action(async () => {
        console.log({ command: this.prefixString + ' ' + preset.name(), args: preset.args, options: preset.opts() })
      })
    this.command.addCommand(preset)
  }

  override initializeCommand() {
    super.initializeCommand()
  }

  override get action() {
    return super.action
  }

  override get isCommand() {
    return true
  }
}

/**
 * class
 */
export class CTNode extends CTBase {
  constructor(prefixString: TNonEmptyString) {
    super(prefixString)
    this.presets.defaults['oneNode'] = true
  }

  override get isNode(): boolean {
    return true
  }

  override initializeCommand() {
    super.initializeCommand()
  }

  override get action() {
    return async (prefix: string[], options: Record<string, unknown>, self: Command) => {
      const search = prefix.slice()
      prefix = prefix.slice(this.prefixArray.length)
      // console.log({ search, options })

      if (prefix.length === 0) {
        const list = this.subCommandList
        const { selected, args } = await commandSearchPrompt(list, {
          defaultValue: self.name(),
          maxResults: 15,
          filtering: {
            startsWith: true,
            includes: true,
          },
        })
        if (selected === '<-') {
          await this.parent?.command.parseAsync()
          return
        }
        await self.parseAsync([...selected.replace(this.prefixString, '').trim().split(' '), ...args.split(' ')], {
          from: 'user',
        })
        return
      }
      if (search.length > 1) {
        const kw = search[0]
        for (const cmd of self.commands) {
          if ((cmd.aliases()[0] || cmd.name()) === kw) {
            console.log(this.prefixString + ' ' + search.slice(1).join(' '))
            cmd.parse(search.slice(2), { from: 'user' })
            return
          }
        }
      }

      // single kw or no matches above, match whole path
      const matches = new Map<string, Set<string>>()
      this.trie.forEach([], (child, prefix) => {
        for (const kw of search) {
          const cmdpath = child.prefixString
          if (cmdpath.includes(kw)) {
            let m = matches.get(child.prefixString)
            if (!m) {
              m = new Set([kw])
              matches.set(child.prefixString, m)
            } else {
              m.add(kw)
            }
          }
        }
      })
      // console.log({ matches })
      const ranked = [...matches.entries()].sort((a, b) => b[1].size - a[1].size)
      const winner = ranked[0]
      if (winner) {
        console.log({ search, match: winner[0] })
        const target = this.trie.get(winner[0].split(' '))
        if (target) {
          const args = search.slice(1)
          await target.command.parseAsync(args, { from: 'user' })
        }
        return
      }

      // no matches
      console.log('no matches')
    }
  }
}

/**
 * class
 */

export class CTRoot extends CTNode {
  static readonly trie = new TrieMap<CTBase>()

  treePrefixes: { root: string; nodes: string[]; commands: string[] }

  constructor(prefixStrings: string[]) {
    const treePrefixes = organizeTreePrefixes(prefixStrings)

    super(treePrefixes.root)

    this.presets.defaults = { name: 'michael', age: 24 }

    this.treePrefixes = treePrefixes

    for (const prefix of this.treePrefixes.nodes) {
      new CTNode(prefix)
    }

    for (const prefix of this.treePrefixes.commands) {
      new CTCommand(prefix)
    }

    this.trie.forEach([], (node) => {
      node.appendPassThroughPassThroughArguments()
      node.setOptions()
      node.setAliases()
      Object.defineProperty(node.command, 'createHelp', {
        value: function createHelp() {
          return new BHelp(node)
        },
      })
      node.command.action(node.action)
    })
  }

  override get isRoot(): boolean {
    return true
  }

  override get subCommandList(): string[] {
    return [this.name, ...this.treePrefixes.nodes, ...this.treePrefixes.commands]
  }
}

////////////////////////////
////////////////////////////
////////////////////////////

const tree = new CTRoot(CLI_LIST)

const arr = tree.trie.toArray().map(([path, node]) => [path.join(' '), node.constructor.name])
const o = Object.fromEntries(arr)
// console.log(o)

const asd = tree.trie.getStrict('b git'.split(' '))
const subCommands = asd.subCommandList
// console.log(subCommands)

console.log('----------')
tree.command.parseAsync().catch(console.error)
