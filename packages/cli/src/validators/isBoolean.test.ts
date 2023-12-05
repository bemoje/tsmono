import { isBoolean } from './isBoolean'

describe(isBoolean.name, () => {
  describe('valid', () => {
    it('true', () => {
      expect(isBoolean(true)).toBe(true)
    })

    it('false', () => {
      expect(isBoolean(false)).toBe(true)
    })
  })

  describe('invalid', () => {
    it('null', () => {
      expect(isBoolean(null)).toBe(false)
    })

    it('undefined', () => {
      expect(isBoolean(undefined)).toBe(false)
    })

    it('zero', () => {
      expect(isBoolean(0)).toBe(false)
    })

    it('empty string', () => {
      expect(isBoolean('')).toBe(false)
    })
  })
})
