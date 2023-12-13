import type { DeepObject } from './DeepObject'
import type { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Return-type of parsed JSON object.
 */

export type JsonObject<P extends JsonRawPrimitive = JsonRawPrimitive> = DeepObject<P, string> | Record<string, P>
