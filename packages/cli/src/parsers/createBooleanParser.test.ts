import { createBooleanParser } from './createBooleanParser'

describe(createBooleanParser.name, () => {
  it('should return a function', () => {
    const parseBoolean = createBooleanParser()
    expect(typeof parseBoolean).toBe('function')
  })

  describe('parseBoolean', () => {
    it('should return true for true values', () => {
      const parseBoolean = createBooleanParser()
      expect(parseBoolean('TRUE')).toBe(true)
      expect(parseBoolean('T')).toBe(true)
      expect(parseBoolean('YES')).toBe(true)
      expect(parseBoolean('Y')).toBe(true)
      expect(parseBoolean('1')).toBe(true)
    })

    it('should return false for false values', () => {
      const parseBoolean = createBooleanParser()
      expect(parseBoolean('')).toBe(false)
      expect(parseBoolean('FALSE')).toBe(false)
      expect(parseBoolean('F')).toBe(false)
      expect(parseBoolean('NO')).toBe(false)
      expect(parseBoolean('N')).toBe(false)
      expect(parseBoolean('0')).toBe(false)
    })

    it('should throw for unknown values', () => {
      const parseBoolean = createBooleanParser()
      expect(() => parseBoolean('UNKNOWN')).toThrow()
    })

    it('should return true for custom true values', () => {
      const parseBoolean = createBooleanParser(['ON', 'ENABLED'])
      expect(parseBoolean('ON')).toBe(true)
      expect(parseBoolean('ENABLED')).toBe(true)
    })

    it('should return false for custom false values', () => {
      const parseBoolean = createBooleanParser([], ['OFF', 'DISABLED'])
      expect(parseBoolean('OFF')).toBe(false)
      expect(parseBoolean('DISABLED')).toBe(false)
    })

    it('should throw for invalid values', () => {
      const parseBoolean = createBooleanParser()
      expect(() => parseBoolean('INVALID')).toThrow()
    })

    it('should include accepted values in the error message', () => {
      const parseBoolean = createBooleanParser(['ON', 'ENABLED'], ['OFF', 'DISABLED'])
      expect(() => parseBoolean('INVALID')).toThrowError(
        'The value INVALID is not a valid boolean value. Accepted values are: ON, ENABLED, OFF, DISABLED'
      )
    })
  })
})
