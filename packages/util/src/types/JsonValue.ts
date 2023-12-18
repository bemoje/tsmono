import { JsonArray } from './JsonArray'
import { JsonObject } from './JsonObject'
import { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Any JSON value. Any JSON.parse() return value.
 */

export type JsonValue<P extends JsonRawPrimitive = JsonRawPrimitive> =
  | P
  | JsonObject<P>
  | JsonArray<P>
  | P[]
  | Record<string, P>
