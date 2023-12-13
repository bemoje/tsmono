import type { ObjectKey } from './ObjectKey'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TPlainObject<K extends ObjectKey = ObjectKey, V = any> = Record<K, V>
