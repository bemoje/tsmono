import { JsonValue } from '@bemoje/util'
import { TConfigValidator } from './TConfigValidator'
import { TStringParser } from './TStringParser'

export interface IConfigEntry<O extends JsonValue = JsonValue> {
  description: string
  parse: TStringParser<O>
  validate?: TConfigValidator<O>
}
