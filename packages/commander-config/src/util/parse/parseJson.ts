export function parseJson(json: string): Record<string | number, unknown> {
  try {
    return JSON.parse(json)
  } catch (error) {
    console.error('Invalid JSON string array.')
    process.exit(1)
  }
}
