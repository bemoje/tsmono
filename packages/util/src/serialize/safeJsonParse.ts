import { SERIALIZABLE_CLASSES } from './core/SERIALIZABLE_CLASSES'
import { regIsoDateString } from './core/regIsoDateString'
import { MAP_SENTINEL } from './sentinels/MAP_SENTINEL'
import { SENTINEL } from './sentinels/SENTINEL'
import { SET_SENTINEL } from './sentinels/SET_SENTINEL'
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Deserializes a JSON string that is the output of @see safeJsonStringify
 *
 * @param json - The JSON string to parse.
 * @returns A JavaScript value derived from the JSON string.
 */
export function safeJsonParse(json: string, noRevivals = false): any {
  // handle primitive
  if (json.startsWith('["\\u0003"')) {
    const primitive = JSON.parse(json)[1]
    if (primitive === 'undefined') return undefined
    if (primitive === 'NaN') return NaN
    if (primitive === 'Infinity') return Infinity
    if (primitive === '-Infinity') return -Infinity
    return safeJsonParse(JSON.stringify([primitive]))[0]
  }
  // handle non-primitive
  return JSON.parse(json, (key, value) => {
    if (value == null) return value
    const t = typeof value
    if (t === 'string') {
      if (!noRevivals && value.charAt(0) === SENTINEL) {
        const [type, id] = value.substring(2).split('|')
        return SERIALIZABLE_CLASSES[type].getInstance(id)
      }
      if (value.length === 24 && regIsoDateString.test(value)) {
        return new Date(value)
      }
      if (/^BigInt:/.test(value)) {
        return BigInt(value.substring(7))
      }
      if (/^Symbol:/.test(value)) {
        return Symbol(value.substring(7))
      }
      if (value === 'NaN') return NaN
      if (value === 'Infinity') return Infinity
      if (value === '-Infinity') return -Infinity
    } else if (t === 'object') {
      if (!noRevivals && Reflect.has(SERIALIZABLE_CLASSES, value.type)) {
        return SERIALIZABLE_CLASSES[value.type].revive(value)
      } else if (Array.isArray(value)) {
        if (value[0] === SET_SENTINEL) {
          return new Set(value[1])
        }
        if (value[0] === MAP_SENTINEL) {
          return new Map(value[1])
        }
      }
    }
    return value
  })
}
