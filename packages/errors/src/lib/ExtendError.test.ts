import { ExtendError } from './ExtendError'

describe('ExtendError', () => {
  const TestError = ExtendError('Test', Error)
  describe('constructor', () => {
    it('should create an instance of ExtendError with the provided message', () => {
      const error = new TestError('Test error')
      expect(error).toBeInstanceOf(TestError)
      expect(error.name).toBe('TestError')
      expect(error.message).toBe('Test error')
    })

    it('should include the stack trace in the object', () => {
      const error = new TestError('Test error')
      expect(error.name).toBe('TestError')
      expect(error.message).toBe('Test error')
    })

    it('should include the cause in the object', () => {
      const cause = 'the cause'
      const error = new TestError('Test error', cause)
      expect(error.cause).toBe(cause)
    })
  })

  describe('toString', () => {
    it('should return a formatted string representation of the error', () => {
      const error = new TestError('Test error')
      expect(!!error.toString()).toBe(true)
      expect(error.toString()).toBe(error.valueOf())
    })

    it('should include the cause in the formatted string', () => {
      const cause = 'THE_CAUSE'
      const error = new TestError('Test error', cause)
      expect(error.toString().includes(cause)).toBe(true)
    })
  })
})
