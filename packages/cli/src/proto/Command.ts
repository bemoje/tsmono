import { Command, ParseOptions } from 'commander'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { splitCombinedArgvShorts } from '../core/splitCombinedArgvShorts'

export function overrideCommanderPrototyper() {
  const oldParse = Command.prototype.parse
  Command.prototype.parse = function parse(this: Command, argv?: readonly string[], options?: ParseOptions) {
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
      const ins = CommandBuilder.commanderBackRefs.get(this)
      if (!ins) throw new Error(`CommandBuilder not found for command ${this.name()}`)
      return ins
    },
  })
}

declare module 'commander' {
  interface Command {
    get builder(): CommandBuilder
  }
}
