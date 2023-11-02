import { arrSome, colors } from '@bemoje/util'
import { Command, Help } from 'commander'
import { BArgument, ValidInputPrimitiveTypes } from './BArgument'
import { trie } from './trie'

class BHelp extends Help {
  constructor() {
    super()
    this.helpWidth = 140
    this.showGlobalOptions = true
    this.sortOptions = false
    this.sortSubcommands = false
  }

  override commandUsage(cmd: BCommand): string {
    const prefix = cmd.cmdprefix.slice(0, -1).join(' ')
    const name = cmd.name()
    return super
      .commandUsage(cmd)
      .replace(prefix, colors.green(colors.dim(prefix)))
      .replace(name, colors.green(colors.bold(name)))
  }

  override formatHelp(cmd: Command, helper: Help): string {
    const lines = super.formatHelp(cmd, helper).split('\n')
    lines.splice(
      1,
      0,
      '',
      'Alias: ' +
        colors.dim(
          cmd
            .aliases()
            .filter((s) => !!s.trim())
            .concat(cmd.name())
            .map(colors.green)
            .join(colors.gray('|'))
        )
    )

    let result = lines
      .join('\n')
      .replace('[cmd]', '[' + '' + colors.green('cmd') + '' + ']')
      .replace('[opt]', '[' + '' + colors.blue('opt') + '' + ']')
      .replace(/\[command\]/gi, '[' + '' + colors.red('cmd') + '' + ']')
      .replace(/\[options\]/gi, '[' + '' + colors.blue('opt') + '' + ']')
      .replace('Usage:', colors.yellow('Usage') + ':')
      .replace('Alias:', colors.cyan('Alias') + ':')
      .replace('Arguments:', colors.magenta('Arguments') + ':')
      .replace('Options:', colors.blue('Options') + ':')
      .replace('Commands:', colors.red('Commands') + ':')

    super.visibleArguments(cmd).forEach((arg) => {
      result = result.replace('[' + arg.name(), '[' + colors.magenta(arg.name()))
    })

    cmd.commands.forEach((cmd) => {
      cmd.registeredArguments.forEach((arg) => {
        result = result.replace('[' + arg.name(), '[' + colors.magenta(arg.name()))
      })
    })

    return result
  }
}

export class BCommand extends Command {
  static updateAliases() {
    trie.forEach([], (cmd) => {
      cmd.setAliases()
    })
  }

  public readonly cmdpath: string
  public readonly cmdprefix: readonly string[]

  constructor(cmdpath: string) {
    const split = cmdpath.split(' ')
    const name = split[split.length - 1]
    if (!name) throw new Error('name is undefined')
    super(name)
    this.cmdpath = cmdpath
    this.cmdprefix = Object.freeze(split)

    this.initHelp()
    this.addToTrie()

    // this.allowUnknownOption(true)
    // this.allowExcessArguments(true)
  }
  /*
{
  type: String | Function,
  name: String | Function,
  message: String | Function,
  initial: String | Function | Async Function
  format: Function | Async Function,
  onRender: Function
  onState: Function
  stdin: Readable
  stdout: Writeable
}
  */

  // buildArgument<T extends ValidInputPrimitiveTypes = string>(
  //   name: string,
  //   fn: (arg: BArgument<T>, self: this) => BArgument<T>
  // ): this {
  //   const arg = new BArgument<T>(name)
  //   this.addArgument(fn.call(this, arg, this))
  //   return this
  // }

  async wizard() {
    const args: BArgument[] = this.registeredArguments as BArgument[]
    return args.map((arg: BArgument) => {
      return arg.determinePromptType()
    })
  }

  arg<T extends ValidInputPrimitiveTypes = string>(name: string, description?: string): BArgument<T> {
    const ins = new BArgument<T>(name, description).setParentCommand(this)
    this.addArgument(ins)
    return ins
  }

  override createHelp() {
    return new BHelp()
  }

  protected initHelp() {
    this.addHelpText('after', '\nEach command is aliased')
    this.showHelpAfterError(true)
    this.showSuggestionAfterError(true)
    this.addHelpCommand('? [command]', 'display help for command')
  }

  protected addToTrie(): void {
    const prefix = this.cmdprefix
    trie.set(prefix.slice(), this)
    trie.get(prefix.slice(0, prefix.length - 1))?.addCommand(this)
  }

  protected get siblings() {
    return this.parent?.commands.filter((cmd) => cmd !== this) || []
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
  protected setAliases(): void {
    let isClashing = true
    const aliases = ['']
    for (let i = 0; i < this.name().length; i++) {
      if (isClashing) {
        const isStillClashing = arrSome(this.siblings, (sibling) => {
          return sibling.name().charAt(i) === this.name().charAt(i)
        })
        if (isStillClashing) continue
        else isClashing = false
      }
      const alias = this.name().substring(0, i + 1)
      if (alias === this.name()) break
      aliases.push(alias)
    }
    this.aliases(aliases)
  }

  get isNode() {
    return false
  }
  get isLeaf() {
    return true
  }
}

class NodeCommand extends BCommand {
  constructor(cmdpath: string) {
    super(cmdpath)
    this.description('Tree node command.')
    this.arg('cmd') //
      .argOptional()
      .setVariadic(true)
      .getParentCommand()
    this.action(async (options, self) => {
      console.log({ options, self })
    })
  }
  override get isNode() {
    return true
  }
  override get isLeaf() {
    return false
  }
}
