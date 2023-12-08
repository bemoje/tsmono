import { ConfigSection } from './ConfigSection'
import { JsonValue } from '@bemoje/util'

export class AppDataSection<Val extends JsonValue = JsonValue> extends ConfigSection<Val> {}
