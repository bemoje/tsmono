import type { DeepArray } from './DeepArray'
import type { ObjectKey } from './ObjectKey'

/**
 * Recursively defined object with objects+arrays with values of a given type V.
 */
export type DeepObject<V, K extends ObjectKey = string | symbol> = {
  [_ in K]?: V | DeepObject<V, K> | DeepArray<V, K>
}

/**
 * Recursively defined array that can contain only objects (excl. arrays) with values of a given type V.
 */
export type StrictlyDeepObject<V, K extends string | symbol = string | symbol> = {
  [_ in K]?: V | StrictlyDeepObject<V, K>
}
