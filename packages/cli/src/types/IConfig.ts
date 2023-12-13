import type { JsonValue } from '@bemoje/util'
import type { TStringParser } from '@bemoje/util'
import type { TValidator } from '@bemoje/util'

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
