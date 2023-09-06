/**
 * Converts the given data to a JSON string.
 * @template T - The type of the data to be converted to JSON.
 * @param data The data to be converted to JSON.
 * @param pretty Optional parameter that determines whether the resulting JSON string should be pretty-printed. Default is `false`.
 * @returns The JSON string representation of the given data.
 * @example ```ts
 * toJson({ name: 'John', age: 30 }, true);;
 * //=> "{\n  "name": "John",\n  "age": 30\n}"
 * ```
 */
export function toJson<T>(data: T, pretty = false): string {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
}
