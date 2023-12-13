import type { JsonValue } from '../util/types/JsonValue'
import type { TStringParser } from '../util/types/TStringParser'
import type { TValidator } from '../util/types/TValidator'

export interface IConfig<Val extends JsonValue> {
  /**
   * The default value of the property.
   */
  defaultValue: Val

  /**
   * The description of the property.
   */
  description: string

  /**
   * A function that parses a string to the desired type.
   */
  parse?: TStringParser<Val>

  /**
   * A function that validates the value.
   */
  validate?: TValidator<Val>
}
