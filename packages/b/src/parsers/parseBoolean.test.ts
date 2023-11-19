import { parseBoolean } from './parseBoolean'

describe(parseBoolean.name, () => {
  describe('when input is a valid true value', () => {
    it('should return true', () => {
      expect(parseBoolean('TRUE')).toBe(true)
      expect(parseBoolean('T')).toBe(true)
      expect(parseBoolean('YES')).toBe(true)
      expect(parseBoolean('Y')).toBe(true)
      expect(parseBoolean('1')).toBe(true)
    })
  })

  describe('when input is a valid false value', () => {
    it('should return false', () => {
      expect(parseBoolean('')).toBe(false)
      expect(parseBoolean('FALSE')).toBe(false)
      expect(parseBoolean('F')).toBe(false)
      expect(parseBoolean('NO')).toBe(false)
      expect(parseBoolean('N')).toBe(false)
      expect(parseBoolean('0')).toBe(false)
    })
  })

  describe('when input is not a valid input', () => {
    it('should throw', () => {
      expect(() => parseBoolean('invalid')).toThrow()
    })
  })
})
