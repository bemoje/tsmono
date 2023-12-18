export function realizeLazyProperty<T>(obj: unknown, key: string, value: T) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    writable: false,
    configurable: false,
    value,
  })
  return value
}
