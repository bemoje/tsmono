import { compare } from './compare'

describe('compare', () => {
  describe('strings', () => {
    it('should return 0 when both strings are equal', () => {
      expect(compare('test', 'test')).toBe(0)
    })

    it('should return a negative number when the first string is less than the second', () => {
      expect(compare('apple', 'banana')).toBeLessThan(0)
    })

    it('should return a positive number when the first string is greater than the second', () => {
      expect(compare('banana', 'apple')).toBeGreaterThan(0)
    })
  })

  describe('numeric', () => {
    it('should return a negative number if the first value is less than the second value', () => {
      expect(compare(1, 2)).toBeLessThan(0)
      expect(compare(-1, 0)).toBeLessThan(0)
      expect(compare(BigInt(1), BigInt(2))).toBeLessThan(0)
      expect(compare(false, true)).toBeLessThan(0)
    })

    it('should return a positive number if the first value is greater than the second value', () => {
      expect(compare(2, 1)).toBeGreaterThan(0)
      expect(compare(0, -1)).toBeGreaterThan(0)
      expect(compare(BigInt(2), BigInt(1))).toBeGreaterThan(0)
      expect(compare(true, false)).toBeGreaterThan(0)
    })

    it('should return zero if the values are equal', () => {
      expect(compare(1, 1)).toEqual(0)
      expect(compare(-1, -1)).toEqual(0)
      expect(compare(BigInt(1), BigInt(1))).toEqual(0)
      expect(compare(false, false)).toEqual(0)
    })
  })
})
