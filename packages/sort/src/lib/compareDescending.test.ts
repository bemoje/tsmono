import { compareDescending } from './compareDescending'

describe('compareDescending', () => {
  describe('strings', () => {
    it('should return a negative number if a is greater than b', () => {
      const result = compareDescending('b', 'a')
      expect(result).toBeLessThan(0)
    })

    it('should return a positive number if a is less than b', () => {
      const result = compareDescending('a', 'b')
      expect(result).toBeGreaterThan(0)
    })

    it('should return 0 if a and b are equal', () => {
      const result = compareDescending('a', 'a')
      expect(result).toBe(0)
    })
  })

  describe('numeric', () => {
    it('should return a negative number if the first value is greater than the second value', () => {
      expect(compareDescending(2, 1)).toBeLessThan(0)
      expect(compareDescending(0, -1)).toBeLessThan(0)
      expect(compareDescending(BigInt(2), BigInt(1))).toBeLessThan(0)
      expect(compareDescending(true, false)).toBeLessThan(0)
    })

    it('should return a positive number if the first value is less than the second value', () => {
      expect(compareDescending(1, 2)).toBeGreaterThan(0)
      expect(compareDescending(-1, 0)).toBeGreaterThan(0)
      expect(compareDescending(BigInt(1), BigInt(2))).toBeGreaterThan(0)
      expect(compareDescending(false, true)).toBeGreaterThan(0)
    })

    it('should return zero if the values are equal', () => {
      expect(compareDescending(1, 1)).toEqual(0)
      expect(compareDescending(-1, -1)).toEqual(0)
      expect(compareDescending(BigInt(1), BigInt(1))).toEqual(0)
      expect(compareDescending(false, false)).toEqual(0)
    })
  })
})
