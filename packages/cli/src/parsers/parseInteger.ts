export function parseInteger(string: string): number {
  const errMsg = 'Not an integer. Got: '
  if (string.includes('.')) throw new TypeError(errMsg + string)
  string = string.replace(/[^-0-9]/g, '')
  if (!string) throw new TypeError(errMsg + string)
  const int = parseInt(string)
  if (isNaN(int)) throw new TypeError(errMsg + string)
  return int
}
