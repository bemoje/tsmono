import { arrLast, TNonEmptyString } from '@bemoje/util'
import { CLI_LIST } from '../cli/list'
import { Command } from 'commander'
import { TrieMap } from '@bemoje/trie-map'

/**
 *
 */
export class CommandTreeBase {
  readonly prefixString: TNonEmptyString

  protected readonly prefixArray: TNonEmptyString[]
  protected readonly command: Command
  protected parent?: CommandTreeNode

  constructor(prefixString: TNonEmptyString) {
    this.prefixString = prefixString
    this.prefixArray = prefixString.split(' ')
    this.command = new Command(arrLast(this.prefixArray))

    this.initializeTreeNode()
    this.initializeParentCommand()
    this.initializeCommandHelp()
    this.initializePropertyAccesses()
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

  get tree(): TrieMap<CommandTreeBase> {
    return CommandTreeRoot.tree
  }

  protected initializePropertyAccesses() {
    Object.freeze(this.prefixArray)
  }

  protected initializeTreeNode(): void {
    CommandTreeRoot.tree.set(this.prefixArray, this)
  }

  protected initializeParentCommand() {
    if (this.isRoot) return
    this.parent = this.tree.getStrict(this.parentPrefixArray)
    this.parent.command.command(this.name, { noHelp: this.isNode })
  }

  protected initializeCommandHelp() {
    this.command.addHelpText('after', '\nEach command is aliased')
    this.command.showHelpAfterError(true)
    this.command.showSuggestionAfterError(true)
    this.command.addHelpCommand('? [command]', 'display help for command')
  }

  *iterateChildren(): Generator<CommandTreeNode> {
    for (const [node] of this.tree.iterateChildren(this.prefixArray)) {
      yield node
    }
  }

  get children(): CommandTreeNode[] {
    return [...this.iterateChildren()]
  }

  *iterateSiblings(): Generator<CommandTreeNode> {
    const parent = this.parent
    if (!parent) return
    for (const node of parent.iterateChildren()) {
      if (node === this) continue
      yield node
    }
  }

  get siblings(): CommandTreeNode[] {
    return [...this.iterateSiblings()]
  }

  *iterateChildrenRecursive(): Generator<CommandTreeNode> {
    for (const child of this.iterateChildren()) {
      yield child
      yield* child.iterateChildrenRecursive()
    }
  }
}

/**
 * class
 */
export class CommandTreeCommand extends CommandTreeBase {
  constructor(prefixString: TNonEmptyString) {
    super(prefixString)
  }

  override get isCommand() {
    return true
  }
}

/**
 * class
 */
export class CommandTreeNode extends CommandTreeBase {
  constructor(prefixString: TNonEmptyString) {
    super(prefixString)
  }

  override get isNode(): boolean {
    return true
  }
}

/**
 * class
 */
export class CommandTreeRoot extends CommandTreeNode {
  static readonly tree = new TrieMap<CommandTreeBase>()
  constructor(prefixStrings: string[]) {
    prefixStrings.sort()
    const prefixArrays = prefixStrings.map((str) => {
      return str
        .trim()
        .split(' ')
        .map((str) => str.trim())
    })
    const nodePrefixesSet = new Set(
      prefixArrays
        .map((arr) => {
          return arr.map((str, i, arr) => {
            return arr.slice(0, i - 1).join(' ')
          })
        })
        .flat()
        .filter((str) => !!str)
    )
    const nodePrefixes = Array.from(nodePrefixesSet).sort((a, b) => a.length - b.length)
    const commandPrefixes = prefixArrays.map((arr) => arr.join(' ')).filter((str) => !nodePrefixesSet.has(str))
    const rootPrefix = nodePrefixes.shift()
    if (!rootPrefix) throw new Error('rootPrefix not found')

    // console.log({ rootPrefix, nodePrefixes, commandPrefixes })

    super(rootPrefix)

    for (const prefix of nodePrefixes) {
      new CommandTreeNode(prefix)
    }
    for (const prefix of commandPrefixes) {
      new CommandTreeCommand(prefix)
    }
  }

  override get isRoot(): boolean {
    return true
  }
}

const tree = new CommandTreeRoot(CLI_LIST)

const arr = tree.tree.toArray().map(([path, node]) => [path.join(' '), node.constructor.name])
const o = Object.fromEntries(arr)
console.log(o)
