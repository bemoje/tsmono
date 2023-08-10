export function parseNumber(string: string): number {
  const n = Number(string)
  if (isNaN(n) || !Number.isFinite(n)) {
    console.error(`The value ${string} is not a valid number.`)
    process.exit(1)
  }
  return n
}
