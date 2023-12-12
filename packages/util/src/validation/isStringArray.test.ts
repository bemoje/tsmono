import { isStringArray } from './isStringArray'

describe(isStringArray.name, () => {
  describe('valid', () => {
    it('string array', () => {
      expect(isStringArray(['a'])).toBe(true)
      expect(isStringArray(['a', 'b'])).toBe(true)
    })

    it('empty array', () => {
      expect(isStringArray([])).toBe(true)
    })
  })

  describe('invalid', () => {
    it('not string array', () => {
      expect(isStringArray([1, 2])).toBe(false)
    })

    it('not array', () => {
      expect(isStringArray(new Set(['a']))).toBe(false)
    })
  })
})
