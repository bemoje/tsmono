import { Command, ParseOptions } from 'commander'
import { CommandBuilder } from './CommandBuilder'

export class CommandBuilderBase {
  readonly name: string
  readonly parent: CommandBuilder | null
  readonly $: Command
  actionHandler?: (this: CommandBuilder, ...args: any[]) => Promise<void>

  constructor(name: string, parent: CommandBuilder | null = null) {
    this.name = name
    this.parent = parent
    this.$ = new Command(name)
    if (parent) parent.$.addCommand(this.$)
  }

  get isRoot() {
    return this.parent === null
  }
  get arguments() {
    return this.$.registeredArguments
  }
  get options() {
    return this.$.options
  }

  usage(usage: string) {
    this.$.usage(usage)
    return this
  }

  description(...lines: string[]) {
    const description = lines.join('\n')
    const summary = description.split(/(\. ?|\n|$)/)[0]
    this.$.summary(summary)
    this.$.description(description)
    return this
  }
  async parseAsync(argv?: readonly string[], options?: ParseOptions): Promise<this> {
    await this.$.parseAsync(argv, options)
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

  get get() {
    return new CommandReader(this.$)
  }
}

class CommandReader {
  constructor(protected readonly $: Command) {}
  get command() {
    return this.$
  }
  get description() {
    return this.$.description()
  }
}
