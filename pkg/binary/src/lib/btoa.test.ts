import { btoa } from './btoa'

describe('btoa', () => {
  it('should convert a buffer to a base64 string', () => {
    const buf = Buffer.from('hello world')
    const result = btoa(buf)
    expect(result).toEqual('aGVsbG8gd29ybGQ=')
  })

  it('should encode a Buffer object to a base64 string', () => {
    const buf = Buffer.from('Hello, World!', 'utf8')
    const result = btoa(buf)
    expect(result).toBe('SGVsbG8sIFdvcmxkIQ==')
  })

  it('should return an empty string if the Buffer object is empty', () => {
    const buf = Buffer.alloc(0)
    const result = btoa(buf)
    expect(result).toBe('')
  })
})
