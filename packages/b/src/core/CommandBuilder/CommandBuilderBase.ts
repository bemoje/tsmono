import { Command, OptionValues, ParseOptions } from 'commander'
import { CommandBuilder } from './CommandBuilder'
import { JsonValue } from '@bemoje/util'

export class CommandBuilderBase {
  readonly name: string
  readonly parent: CommandBuilder | null
  readonly $: Command
  actionHandler: (this: CommandBuilder, args: JsonValue[], opts: OptionValues, cb: CommandBuilder) => Promise<void>

  constructor(name: string, parent: CommandBuilder | null = null) {
    this.name = name
    this.parent = parent
    this.$ = new Command(name)
    if (parent) parent.$.addCommand(this.$)
    this.actionHandler = async () => this.$.help()
  }

  get registeredArguments() {
    return this.$.registeredArguments
  }
  get options() {
    return this.$.options
  }

  usage(usage: string) {
    this.$.usage(usage)
    return this
  }
  getDescription() {
    return this.$.description()
  }
  description(description: string) {
    const summary = description.split(/(\. ?|\n|$)/)[0]
    this.$.summary(summary)
    this.$.description(description)
    return this
  }
  async parseAsync(argv?: readonly string[], options?: ParseOptions): Promise<this> {
    await this.$.parseAsync(argv, options)
    return this
  }
}
