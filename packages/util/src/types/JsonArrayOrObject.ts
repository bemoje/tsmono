import { JsonArray } from './JsonArray'
import { JsonObject } from './JsonObject'
import { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Return-type of parsed JSON array.
 */

export type JsonArrayOrObject<P extends JsonRawPrimitive = JsonRawPrimitive> =
  | JsonArray<P>
  | JsonObject<P>
  | P[]
  | Record<string, P>
