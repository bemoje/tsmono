import { base64ToBuffer } from './base64ToBuffer'

describe('atob', () => {
  it('should convert a base64 buffer to a string', () => {
    const result = base64ToBuffer('SGVsbG8gV29ybGQh')
    expect(result).toEqual(Buffer.from('Hello World!'))
  })

  it('should decode a base64 encoded string into a Buffer', () => {
    const encodedString = 'SGVsbG8gd29ybGQ=' // "Hello world" in base64
    const expectedBuffer = Buffer.from('Hello world')

    const result = base64ToBuffer(encodedString)

    expect(result).toEqual(expectedBuffer)
  })

  it('should return an empty Buffer if the input string is empty', () => {
    const encodedString = ''
    const expectedBuffer = Buffer.from('')

    const result = base64ToBuffer(encodedString)

    expect(result).toEqual(expectedBuffer)
  })
})
