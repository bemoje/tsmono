export function parseJsonObject<T>(json: string): Record<string, T> {
  return JSON.parse(json) as Record<string, T>
}
