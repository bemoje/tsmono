// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): value is string {
  return typeof value === 'string'
}
