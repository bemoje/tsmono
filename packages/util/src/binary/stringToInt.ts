export function stringToInt(str: string): number {
  const buf = Buffer.from(str, 'utf16le')
  const view = new DataView(new Uint8Array(buf).buffer)
  return Number(view.getBigInt64(0))
}
