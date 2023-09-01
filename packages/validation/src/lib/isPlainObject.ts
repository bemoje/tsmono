/**
 * Checks if the provided value is a plain object, i.e. an object created by the native base `Object` constructor.
 */
export function isPlainObject(value: unknown): boolean {
  if (Object.prototype.toString.call(value) !== '[object Object]') return false
  if (!value?.constructor) return true
  if (Object.prototype.toString.call(value.constructor.prototype) !== '[object Object]') return false
  if (!Object.prototype.hasOwnProperty.call(value.constructor.prototype, 'isPrototypeOf')) return false
  return true
}
