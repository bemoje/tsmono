import { JsonRawPrimitive } from '@bemoje/util'
import { TStringParser } from './TStringParser'
import { TValidator } from './TValidator'

export interface IConfigDefinePropertyOptions<Val = JsonRawPrimitive> {
  description: string
  defaultValue: Val
  parse: TStringParser<Val>
  validate?: TValidator<Val>
}
