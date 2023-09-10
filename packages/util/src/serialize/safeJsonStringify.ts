import { SERIALIZABLE_CLASSES } from './core/SERIALIZABLE_CLASSES'
import { MAP_SENTINEL } from './sentinels/MAP_SENTINEL'
import { PRIMITIVE_SENTINEL } from './sentinels/PRIMITIVE_SENTINEL'
import { SENTINEL } from './sentinels/SENTINEL'
import { SET_SENTINEL } from './sentinels/SET_SENTINEL'

/**
 * JSON.stringify replacement that
 * - handles circular references
 * - always returns a string even if primitives are passed
 * - the input value is always the exact same output value when deserialized (for supported types)
 * - supportes ALL primitive types including NaN, Infinity, -Infinity
 * - supports all object types including Date, Set, Map
 * To deserialize the stringified object, use @see safeJsonParse.
 * To register custom class types, use @see registerClass.
 *
 * @param value - The value to convert to a JSON string.
 * @param indent - The string or number used to insert white space into the output JSON string for readability purposes.
 * @returns A JSON string representing the given value.
 */
export function safeJsonStringify(value: unknown, indent = 0): string {
  // handle primitives
  if (value === undefined) return primitive(String(value))
  if (value === null) return primitive(value)
  const type = typeof value
  if (type === 'bigint') return primitive('BigInt:' + String(value))
  if (type === 'symbol') return primitive(symbolToString(value as symbol))
  if (type === 'number') {
    if (isNaN(value as number)) return primitive('NaN')
    if (!Number.isFinite(value)) return primitive(String(value))
  }
  if (type === 'function') return primitive(String(undefined))
  if (type !== 'object') return primitive(value)

  // handle non-primitive
  const cache: Set<unknown> = new Set()
  const result = JSON.stringify(
    value,
    (key, val) => {
      if (val == null) return val
      const t = typeof val
      if (t === 'string') return val
      if (t === 'number') {
        if (isNaN(val)) return 'NaN'
        if (Number.isFinite(val)) return val
        return String(val)
      }
      if (t === 'object') {
        if (typeof val['type'] === 'string' && SERIALIZABLE_CLASSES[val['type']]) {
          return key === '' ? val : [SENTINEL, val['type'], val['id']].join('|')
        }
        if (cache.has(val)) {
          return '[Circular Reference]'
        }
        cache.add(val)
        if (val instanceof Set) {
          return [SET_SENTINEL, Array.from(val)]
        }
        if (val instanceof Map) {
          return [MAP_SENTINEL, Array.from(val.entries())]
        }
        return val
      }
      if (t === 'bigint') return 'BigInt:' + String(val)
      if (t === 'symbol') return symbolToString(val)
      return val
    },
    indent
  )
  return result
}

function primitive(value: unknown) {
  return JSON.stringify([PRIMITIVE_SENTINEL, value])
}

function symbolToString(value: symbol) {
  return value.toString().replace(/\(/g, ':').replace(/\)$/, '')
}
