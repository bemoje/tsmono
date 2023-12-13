import type { JsonArray } from './JsonArray'
import type { JsonObject } from './JsonObject'
import type { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Any JSON value. Any JSON.parse() return value.
 */

export type JsonValue<P extends JsonRawPrimitive = JsonRawPrimitive> =
  | P
  | JsonObject<P>
  | JsonArray<P>
  | P[]
  | Record<string, P>
