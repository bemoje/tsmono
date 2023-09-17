export function parseJson(json: string): Record<string | number, unknown> {
  try {
    const arr = JSON.parse(json)
    return arr
  } catch (error) {
    console.error('Invalid JSON string array.')
    process.exit(1)
  }
}
