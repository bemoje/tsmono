import { Any } from '../util/types/Any'
import { CommandBuilder } from './CommandBuilder'
import { countInstance } from '../core/counter'
import { ErrorParser } from '../util/errors/ErrorParser'
import { Option } from 'commander'
import { OutputManager } from '../core/OutputManager'
import { TStringParser } from '../util/types/TStringParser'
import { TValidator } from '../util/types/TValidator'

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

  get actionHandler(): (this: CommandBuilder, ...args: any[]) => void | Promise<void> {
    return async function defaultActionHandler(this: CommandBuilder) {
      this.outputHelp()
    }
  }
  get errorHandler(): (this: CommandBuilder, error: unknown, cmd: CommandBuilder) => void {
    return function defaultErrorHandler(this: CommandBuilder, error: unknown) {
      const parsed = new ErrorParser(error)
      if (OutputManager.getInstance().debug.isEnabled) {
        console.error(parsed.prettyStack())
        this.outputError(parsed.summary())
      } else {
        this.outputError(parsed.summary())
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
