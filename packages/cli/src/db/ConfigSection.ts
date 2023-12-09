import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { assertThat, JsonValue, objAssign } from '@bemoje/util'
import { countInstance } from '../core/counter'
import { IConfigDefinePropertyOptions } from '../types/IConfigDefinePropertyOptions'
import { JsonFile } from './JsonFile'
import { TStringParser } from '../types/TStringParser'
import { TValidator } from '../types/TValidator'

export class ConfigSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  readonly parsers: Record<string, TStringParser<Val>> = {}
  readonly descriptions: Record<string, string> = {}
  readonly validators: Record<string, TValidator<Val>> = {}

  constructor(file: JsonFile, name: string, keysAreFixed = true) {
    super(file, name, keysAreFixed)
    countInstance(ConfigSection)
  }

  override assertValid(key: string, value: Val) {
    if (!this.validators[key]) return
    assertThat(value, this.validators[key])
  }

  override defineProperty(key: string, options: IConfigDefinePropertyOptions<Val>) {
    const { description, defaultValue, parse, validate } = options
    this.defaultValues[key] = JSON.parse(JSON.stringify(defaultValue))
    if (parse) this.parsers[key] = parse
    if (validate) this.validators[key] = validate
    this.descriptions[key] = description ?? ''
    this.assertValid(key, options.defaultValue)
  }

  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.file.db.getSafe<typeof this.defaultValues>(this.prefix())
    console.log({ init: this })
    const result = objAssign({}, JSON.parse(JSON.stringify(this.defaultValues)), data || {})
    this.file.db.set(this.prefix(), result, save)
    this.isInitialized = true
  }

  get keys() {
    return [...Object.keys(this.defaultValues)]
  }
}
