import { DeepArray } from './DeepArray'
import { JsonRawPrimitive } from './JsonRawPrimitive'

/**
 * Return-type of parsed JSON array.
 */

export type JsonArray<P extends JsonRawPrimitive = JsonRawPrimitive> = DeepArray<P, string> | P[]
