import { parseError } from './parseError'

describe(parseError.name, () => {
  it('example', () => {
    const message = 'An error occurred.'
    function func() {
      throw new Error(message)
    }
    try {
      func()
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error)
      const parsed = parseError(e as Error)
      expect(parsed.type).toBe('Error')
      expect(parsed.message).toBe(message)
      expect(parsed.stack.length).toBeGreaterThan(0)
      const frame = parsed.stack[0]
      const { call, file } = frame
      expect(file.includes(parseError.name + '.test.ts')).toBe(true)
      expect(call).toBe('func')
    }
  })

  it('works with cause property', () => {
    class MyError extends Error {
      constructor(message: string, public override cause?: unknown) {
        super(message)
      }
    }
    const cause = 'THE_CAUSE'
    try {
      throw new MyError('An error occurred.', cause)
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error)
      const parsed = parseError(e as Error)
      expect(parsed.type).toBe('MyError')
      expect(parsed.message).toBe('An error occurred.')
      expect(parsed.cause).toBe(cause)
    }
  })
})
