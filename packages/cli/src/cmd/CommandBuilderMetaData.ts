import { Any, ErrorParser, TStringParser, TValidator } from '@bemoje/util'
import { Command, Option } from 'commander'
import { CommandBuilder } from './CommandBuilder'
import { countInstance } from '../core/counter'
import { OutputManager } from '../core/OutputManager'

export class CommandBuilderMetaData {
  subcommands: CommandBuilder[] = []
  globalOptions: Option[] = []
  hiddenGlobalOptions = new Set<Option>()
  presetOptionKeys: string[] = []
  argParsers: TStringParser<Any>[] = []
  argValidators: TValidator<Any>[][] = []
  optParsers: Record<string, TStringParser<Any>> = {}
  optValidators: Record<string, TValidator<Any>[]> = {}
  rawArgs: string[] = []
  isNative = false
  isInitialized = false

  constructor() {
    countInstance(CommandBuilderMetaData)
  }

  get actionHandler(): (this: Command, ...args: any[]) => void | Promise<void> {
    return async function defaultActionHandler(this: Command) {
      this.builder.outputHelp()
    }
  }
  get errorHandler(): (this: Command, error: unknown, cmd: CommandBuilder) => void {
    return function defaultErrorHandler(this: Command, error: unknown) {
      const parsed = new ErrorParser(error)
      if (OutputManager.getInstance().debug.isEnabled) {
        console.error(parsed.prettyStack())
        this.builder.outputError(parsed.summary())
      } else {
        this.builder.outputError(parsed.summary())
      }
    }
  }
  get hasCustomActionHandler() {
    return Object.hasOwn(this, 'actionHandler')
  }
  get hasCustomErrorHandler() {
    return Object.hasOwn(this, 'errorHandler')
  }
}
