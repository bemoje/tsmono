import { DeepArray } from './DeepArray'
import { DeepObject } from './DeepObject'

/**
 * All supported primitive types in JSON.
 */
export type JsonRawPrimitive = null | JsonDefinedPrimitive

/**
 * All supported defined (!= null) primitive types in JSON.
 */
export type JsonDefinedPrimitive = string | number | boolean

/**
 * Return-type of parsed JSON object.
 */
export type JsonObject<P extends JsonRawPrimitive = JsonRawPrimitive> = DeepObject<P, string> | Record<string, P>

/**
 * Return-type of parsed JSON array.
 */
export type JsonArray<P extends JsonRawPrimitive = JsonRawPrimitive> = DeepArray<P, string> | P[]

/**
 * Return-type of parsed JSON array.
 */
export type JsonArrayOrObject<P extends JsonRawPrimitive = JsonRawPrimitive> =
  | JsonArray<P>
  | JsonObject<P>
  | P[]
  | Record<string, P>

/**
 * Any JSON value. Any JSON.parse() return value.
 */
export type JsonValue<P extends JsonRawPrimitive = JsonRawPrimitive> =
  | P
  | JsonObject<P>
  | JsonArray<P>
  | P[]
  | Record<string, P>
