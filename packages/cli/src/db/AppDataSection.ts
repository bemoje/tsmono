import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { countInstance } from '../core/counter'
import { IAppDataDefinePropertyOptions } from '../types/IAppDataDefinePropertyOptions'
import { JsonFile } from './JsonFile'
import { JsonValue } from '@bemoje/util'

/**
 * A class that represents the user-config section of the JSON file used as simple database.
 */
export class AppDataSection<Val extends JsonValue = JsonValue> extends AbstractJsonFileSection<Val> {
  override readonly defaultValues: Record<string, Val> = {}
  constructor(file: JsonFile, name: string) {
    super(file, name, false)
    countInstance(AppDataSection)
  }

  override assertValid() {
    return
  }

  override defineProperty(key: string, options: IAppDataDefinePropertyOptions<Val>) {
    const { defaultValue } = options
    this.defaultValues[key] = defaultValue
  }

  override initialize(save = false) {
    if (this.isInitialized) return
    const data = this.file.db.getSafe<typeof this.defaultValues>(this.prefix())
    if (!data) this.file.db.set(this.prefix(), this.defaultValues, save)
    console.log({ init: this })
    this.isInitialized = true
  }

  get keys() {
    return [...Object.keys(this.defaultValues)]
  }
}
