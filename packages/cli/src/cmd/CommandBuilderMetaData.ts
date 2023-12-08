import { Any } from '@bemoje/util'
import { Command, Option } from 'commander'
import { CommandBuilder } from './CommandBuilder'
import { ErrorParser } from '../core/util/ErrorParser'
import { OutputManager } from '../core/OutputManager'
import { TStringParser } from '../types/TStringParser'
import { TValidator } from '../types/TValidator'

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

  get actionHandler(): (this: Command, ...args: any[]) => Promise<void> {
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
