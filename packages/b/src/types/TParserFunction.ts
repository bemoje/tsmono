import { JsonValue } from '@bemoje/util'

export type TParserFunction<O = JsonValue> = (value: string) => O
