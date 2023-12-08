import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { assertThat, JsonValue } from '@bemoje/util'
import { IConfigDefinePropertyOptions } from '../types/IDefinePropertyOptions'
import { isString } from '../validators/isString'
import { JsonFile } from './JsonFile'
import { objAssign } from '../core/util/objAssign'
import { parseString } from '@bemoje/commander-config'
import { TStringParser } from '../types/TStringParser'
import { TValidator } from '../types/TValidator'

/**
 * A class that represents the user-config section of the JSON file used as simple database.
 */
export class ConfigSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  readonly descriptions: Record<string, string> = {}
  readonly validators: Record<string, TValidator<Val>> = {}
  readonly parsers: Record<string, TStringParser<Val>> = {}

  constructor(file: JsonFile, name: string, keysAreFixed = true) {
    super(file, name, keysAreFixed)
  }

  override assertValid(key: string, value: Val) {
    if (!this.validators[key]) return
    assertThat(value, this.validators[key])
  }

  override defineProperty(key: string, options: IConfigDefinePropertyOptions<Val>) {
    const { description, defaultValue, parse, validate } = options
    this.defaultValues[key] = JSON.parse(JSON.stringify(defaultValue))
    this.parsers[key] = parse ?? parseString
    this.validators[key] = validate ?? isString
    this.descriptions[key] = description ?? ''
    this.assertValid(key, options.defaultValue)
  }

  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.file.db.getSafe<typeof this.defaultValues>(this.prefix())
    const config = objAssign({}, this.defaultValues, data || {})
    this.file.db.set(this.prefix(), config, save)
    this.isInitialized = true
  }

  get keys() {
    return [...Object.keys(this.defaultValues)]
  }
}
