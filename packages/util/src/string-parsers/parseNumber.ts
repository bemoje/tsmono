export function parseNumber(string: string): number {
  if (string.endsWith('Infinity')) return Number(string)
  string = string.replace(/[^-0-9.]/g, '')
  if (!string) return NaN
  return Number(string)
}
