export function parseInteger(string: string): number {
  const n = Number(string)
  if (!Number.isInteger(n)) {
    throw new Error(`The value ${string} is not an integer.`)
  }
  return n
}
