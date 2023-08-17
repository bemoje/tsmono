import { intToBuffer } from './intToBuffer'

describe('intToBuffer', () => {
  it('should convert an integer to a buffer', () => {
    const int = 123
    const buffer = intToBuffer(int)
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer).toEqual(Buffer.from([123]))
  })

  it('should convert an integer to a Buffer', () => {
    const result = intToBuffer(123)
    expect(result).toBeInstanceOf(Buffer)
    expect(result.toString('hex')).toBe('7b')
  })

  it('should convert a negative integer to a Buffer', () => {
    const result = intToBuffer(-123)
    expect(result).toBeInstanceOf(Buffer)
    expect(result.toString('hex')).toBe('85')
  })

  it('should convert zero to a Buffer', () => {
    const result = intToBuffer(0)
    expect(result).toBeInstanceOf(Buffer)
    expect(result.toString('hex')).toBe('00')
  })
})
