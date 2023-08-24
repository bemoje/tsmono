export function funFirstParamName(func: (...args: any[]) => unknown): string | void {
  const src = func.toString()
  const match = src.substring(src.indexOf('(') + 1).match(/^[^:,]+/)
  if (!match) return
  return match[0]
}
