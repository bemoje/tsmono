import { isNumber } from './isNumber'

describe(isNumber.name, () => {
  describe('valid', () => {
    it('zero', () => {
      expect(isNumber(0)).toBe(true)
    })

    it('N', () => {
      expect(isNumber(3)).toBe(true)
      expect(isNumber(-3)).toBe(true)
    })

    it('R', () => {
      expect(isNumber(3.1)).toBe(true)
      expect(isNumber(-3.1)).toBe(true)
    })
  })

  describe('invalid', () => {
    it('infinity', () => {
      expect(isNumber(Infinity)).toBe(false)
      expect(isNumber(-Infinity)).toBe(false)
    })

    it('NaN', () => {
      expect(isNumber(NaN)).toBe(false)
    })
  })
})
