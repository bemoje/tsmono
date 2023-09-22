export function parseJsonArray<T>(json: string): T[] {
  return JSON.parse(json) as T[]
}
