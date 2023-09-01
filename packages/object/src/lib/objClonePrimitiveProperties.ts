import { ObjectKey } from '../types/ObjectKey'
import { TPrimitive } from '../types/TPrimitive'

/**
 * Creates a shallow clone of an object, but replaces all non-primitive values with a string representation of the value's type.
 * @param o - The object to clone.
 */
export function objClonePrimitiveProperties(o: Record<ObjectKey, unknown>): Record<ObjectKey, TPrimitive> {
  const clone: Record<ObjectKey, TPrimitive> = {}
  for (const [key, value] of Object.entries(o)) {
    clone[key] = isPrimitive(value) ? value : `[${Object.getPrototypeOf(value).constructor.name}]`
  }
  return clone
}

function isPrimitive(value: unknown): value is null | undefined | bigint | boolean | number | string | symbol {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null
}
