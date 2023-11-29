import { JsonRawPrimitive } from '@bemoje/util'
import { TConfigValidator } from './TConfigValidator'
import { TStringParser } from './TStringParser'

export interface IConfigDefinePropertyOptions<Val = JsonRawPrimitive> {
  description: string
  defaultValue: Val
  parse: TStringParser<Val>
  validate?: TConfigValidator<Val>
}
