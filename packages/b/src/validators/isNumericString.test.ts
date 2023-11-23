import { isNumericString } from './isNumericString'

describe(isNumericString.name, () => {
  describe('valid', () => {
    it('zero', () => {
      expect(isNumericString('0')).toBe(true)
    })

    it('N', () => {
      expect(isNumericString('3')).toBe(true)
      expect(isNumericString('-3')).toBe(true)
    })

    it('R', () => {
      expect(isNumericString('3.1')).toBe(true)
      expect(isNumericString('-3.1')).toBe(true)
    })

    it('thousand sep', () => {
      expect(isNumericString('1.000')).toBe(true)
      expect(isNumericString('1,000')).toBe(true)
      expect(isNumericString('1.000,2')).toBe(true)
      expect(isNumericString('1,000.2')).toBe(true)
    })
  })

  describe('invalid', () => {
    it('spaces', () => {
      expect(isNumericString('1. 23')).toBe(false)
    })

    it('empty string', () => {
      expect(isNumericString('')).toBe(false)
    })

    it('Infinity', () => {
      expect(isNumericString('Infinity')).toBe(false)
    })

    it('NaN', () => {
      expect(isNumericString('NaN')).toBe(false)
    })
  })
})
