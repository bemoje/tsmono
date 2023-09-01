import { ExtensibleError } from './ExtensibleError'

describe('ExtensibleError', () => {
  describe('constructor', () => {
    it('should create an instance of ExtensibleError with the provided message', () => {
      const error = new ExtensibleError('Test error')
      expect(error).toBeInstanceOf(ExtensibleError)
      expect(error.type).toBe('ExtensibleError')
      expect(error.message).toBe('Test error')
    })

    it('should include the stack trace in the object', () => {
      const error = new ExtensibleError('Test error')
      expect(error.frames[0]).toHaveProperty('call')
      expect(error.frames[0]).toHaveProperty('file')
      expect(error.type).toBe('ExtensibleError')
      expect(error.message).toBe('Test error')
    })

    it('should include the cause in the object', () => {
      const cause = 'the cause'
      const error = new ExtensibleError('Test error', cause)
      expect(error.cause).toBe(cause)
    })
  })

  describe('toString', () => {
    it('should return a formatted string representation of the error', () => {
      const error = new ExtensibleError('Test error')
      expect(!!error.toString()).toBe(true)
      expect(error.toString()).toBe(error.valueOf())
    })

    it('should include the cause in the formatted string', () => {
      const cause = 'THE_CAUSE'
      const error = new ExtensibleError('Test error', cause)
      expect(error.toString().includes(cause)).toBe(true)
    })
  })

  describe('toJSON', () => {
    it('should return an object with the error properties', () => {
      const cause = 'THE_CAUSE'
      const message = 'Test error'
      const error = new ExtensibleError(message, cause)
      const deserialized = JSON.parse(JSON.stringify(error))
      expect(deserialized.type).toBe('ExtensibleError')
      expect(deserialized.message).toBe(message)
      expect(deserialized).toHaveProperty('stack')
      expect(Array.isArray(deserialized.stack)).toBe(true)
      expect(deserialized.cause).toBe(cause)
    })
  })
})
