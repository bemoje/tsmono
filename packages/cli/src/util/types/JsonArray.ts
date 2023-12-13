import type { DeepArray } from './DeepArray'
import type { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Return-type of parsed JSON array.
 */

export type JsonArray<P extends JsonRawPrimitive = JsonRawPrimitive> = DeepArray<P, string> | P[]
