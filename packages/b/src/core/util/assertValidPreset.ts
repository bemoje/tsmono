import { assertPresetArgsOptional } from './assertPresetArgsOptional'
import { assertThat, isObject } from '@bemoje/util'
import { assertValidArguments } from './assertValidArguments'
import { assertValidOptions } from './assertValidOptions'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { IPreset } from '../../types/IPreset'
import { isArray } from '../../validators/isArray'
import { isString } from '../../validators/isString'
import { isStringArray } from '../../validators/isStringArray'

export function assertValidPreset(cmd: CommandBuilder, key: string, preset: IPreset) {
  const { description, presets, args, options } = preset
  assertThat(key, isDashUnderlineAlphaNumericString)
  assertThat(description, isString)
  assertThat(presets, isStringArray)
  assertThat(args, isArray)
  assertPresetArgsOptional(cmd, args)
  assertValidArguments(cmd, args)
  assertThat(options, isObject)
  assertValidOptions(cmd, options)
}

function isDashUnderlineAlphaNumericString(value: unknown) {
  return isString(value) && /^[a-z0-9-_]+$/i.test(value)
}
