import { JsonValue } from '@bemoje/util'

export type TConfigParser<O = JsonValue> = (value: string) => O
