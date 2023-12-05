import { Any } from '@bemoje/util'
import { Base } from './Base'
import { CommandBuilder } from './CommandBuilder'
import { Option } from 'commander'
import { realizeLazyProperty } from '../util/realizeLazyProperty'
import { TStringParser } from '../../types/TStringParser'
import { TValidator } from '../../types/TValidator'

export class CommandBuilderMetaData extends Base {
  subcommands: CommandBuilder[] = []
  globalOptions: Option[] = []
  hiddenGlobalOptions = new Set<Option>()
  isNative = false
  actionHandler?: (...args: Any[]) => Promise<void>

  get argParsers(): TStringParser<Any>[] {
    return realizeLazyProperty(this, 'argParsers', [])
  }
  get argValidators(): TValidator<Any>[][] {
    return realizeLazyProperty(this, 'argValidators', [])
  }
  get optParsers(): Record<string, TStringParser<Any>> {
    return realizeLazyProperty(this, 'optParsers', {})
  }
  get optValidators(): Record<string, TValidator<Any>[]> {
    return realizeLazyProperty(this, 'optValidators', {})
  }
}
