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
      expect(parsed.stack.length).toBeGreaterThan(0)
      const frame = parsed.frames[0]
      const { call, file } = frame
      expect(file.includes(parseError.name + '.test.ts')).toBe(true)
      expect(call).toBe('func')
    }
  })
})
