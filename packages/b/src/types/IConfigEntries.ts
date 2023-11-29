import { IConfigEntry } from './IConfigEntry'
import { JsonValue } from '@bemoje/util'

export interface IConfigEntries<O extends JsonValue = JsonValue> {
  [key: string]: IConfigEntry<O>
}
