import { assertThat, JsonArray } from '@bemoje/util'

export function parseJsonArray(json: string): JsonArray {
  try {
    return assertThat(JSON.parse(json), Array.isArray)
  } catch (error) {
    throw new TypeError('Invalid JSON array.')
  }
}
