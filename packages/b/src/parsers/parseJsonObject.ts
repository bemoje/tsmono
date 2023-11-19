import { assertThat, isPlainObject } from '@bemoje/util'
import { JsonObject } from '@bemoje/util'

export function parseJsonObject(json: string): JsonObject {
  try {
    return assertThat(JSON.parse(json), isPlainObject)
  } catch (error) {
    throw new TypeError('Invalid JSON object.')
  }
}
