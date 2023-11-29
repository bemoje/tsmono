import { JsonValue } from '@bemoje/util'

export type TConfigValidator<T = JsonValue> = (value: T, ...args: any[]) => boolean
