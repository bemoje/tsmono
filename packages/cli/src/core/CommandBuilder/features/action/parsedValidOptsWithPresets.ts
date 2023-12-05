import { assertValidOptions } from '../../../util/assertValidOptions'
import { CommandBuilder } from '../../CommandBuilder'
import { deleteOptionsWithDefaultOrNoValue } from './deleteOptionsWithDefaultOrNoValue'
import { OptionValues } from 'commander'
import { optsWithGlobalsParsed } from './optsWithGlobalsParsed'

export function parsedValidOptsWithPresets(cb: CommandBuilder, presetOpts: OptionValues[]) {
  const parsed = optsWithGlobalsParsed(cb)
  const opts = presetOpts.length ? Object.assign({}, ...presetOpts, parsed) : parsed
  deleteOptionsWithDefaultOrNoValue(cb, opts)
  assertValidOptions(cb, opts)
  return opts
}
