import { streamToString } from './streamToString'
import { StringStream } from './StringStream'

describe(StringStream.name, () => {
  it('example', async () => {
    const str = 'this is a string'
    const stream = new StringStream(str)
    expect(await streamToString(stream)).toBe(str)
  })

  describe('constructor', () => {
    it('should create a StringStream instance', () => {
      const stringStream = new StringStream('Hello, world!')
      expect(stringStream).toBeInstanceOf(StringStream)
    })
  })

  describe('string', () => {
    it('should return the string passed in the constructor', () => {
      const string = 'Hello, world!'
      const stringStream = new StringStream(string)
      expect(stringStream.string).toBe(string)
    })
  })

  describe('ended', () => {
    it('should be initially set to false', () => {
      const stringStream = new StringStream('Hello, world!')
      expect(stringStream.ended).toBe(false)
    })
  })

  describe('_read', () => {
    it('should push the string as a buffer', (done) => {
      const string = 'Hello, world!'
      const stringStream = new StringStream(string)
      const chunks: Buffer[] = []
      stringStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })
      stringStream.on('end', () => {
        done()
      })
      stringStream._read()
    })
  })
})
