export function intToString(int: number): string {
  const buffer = new ArrayBuffer(8)
  new DataView(buffer).setBigInt64(0, BigInt(int))
  return Buffer.from(buffer).toString('utf16le')
}
