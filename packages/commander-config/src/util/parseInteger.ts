export function parseInteger(string: string): number {
  const n = Number(string)
  if (!Number.isInteger(n)) {
    console.error(`The value ${string} is not an integer.`)
    process.exit(1)
  }
  return n
}
