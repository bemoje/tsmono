import { JsonValue } from '@bemoje/util'

export type TValidator<T = JsonValue> = (value: T, ...args: any[]) => boolean
