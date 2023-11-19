// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInteger(value: any): value is number {
  return Number.isInteger(value)
}
