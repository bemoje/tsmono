export function isNumericString(string: string): boolean {
  return /^[0-9,.]+$/.test(string.trim())
}
