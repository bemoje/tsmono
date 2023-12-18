import { DeepObject } from './DeepObject'
import { ObjectKey } from './ObjectKey'

/**
 * Recursively defined array that can contain objects+arrays with values of a given type V.
 */
export type DeepArray<V, K extends ObjectKey = string | symbol> = Array<V | DeepObject<V, K> | DeepArray<V, K>> | []

/**
 * Recursively defined array that can contain only arrays (excl. objects) with values of a given type V.
 */
export type StrictlyDeepArray<V> = Array<V | StrictlyDeepArray<V>>
