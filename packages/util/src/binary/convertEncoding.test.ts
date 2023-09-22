import { convertEncoding } from './convertEncoding'

describe(convertEncoding.name, () => {
  const input = 'Hello there'
  const enc = convertEncoding(input, { from: 'ascii', to: 'hex' })
  const dec = convertEncoding(enc, { from: 'hex', to: 'ascii' })
  expect(input === dec).toBe(true)

  it('should convert encoding between base64 and hex', () => {
    const int = 12512
    const buffer = new ArrayBuffer(8)
    new DataView(buffer).setBigInt64(0, BigInt(int))
    const utf = Buffer.from(buffer).toString('utf16le')
    const base64 = convertEncoding(utf, { from: 'utf16le', to: 'base64url' })
    const hex = convertEncoding(base64, { from: 'base64url', to: 'hex' })
    expect(parseInt(hex, 16)).toBe(int)
  })
})
