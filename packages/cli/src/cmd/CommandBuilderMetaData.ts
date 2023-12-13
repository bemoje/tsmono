import type { Any } from '@bemoje/util'
import { CommandBuilder } from './CommandBuilder'
import { ErrorParser } from '@bemoje/util'
import { Option } from '@commander-js/extra-typings'
import { OutputManager } from '../core/OutputManager'
import type { TStringParser } from '@bemoje/util'
import type { TValidator } from '@bemoje/util'

export class CommandBuilderMetaData<Args extends Any[] = unknown[]> {
  subcommands: CommandBuilder[] = []
  optsMap: Record<string, Option> = {}
  globalOptions: Option[] = []
  hiddenGlobalOptions = new Set<Option>()
  presetOptionKeys: string[] = []
  argParsers: TStringParser<Any>[] = []
  argValidators: TValidator<Any>[][] = []
  optParsers: Record<string, TStringParser<Any>> = {}
  optValidators: Record<string, TValidator<Any>[]> = {}
  rawArgs: string[] = []
  isNative = false
  isActionAsync = false

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
