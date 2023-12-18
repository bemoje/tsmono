import { isNamedFunction } from './isNamedFunction'

export function isNamedFunctionArray(array: unknown): boolean {
  return Array.isArray(array) && array.every(isNamedFunction)
}
