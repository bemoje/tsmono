import { isString } from './isString'

describe(isString.name, () => {
  describe('valid', () => {
    it('empty string', () => {
      expect(isString('')).toBe(true)
    })

    it('string', () => {
      expect(isString('hello')).toBe(true)
    })
  })

  describe('invalid', () => {
    it('non-string', () => {
      expect(isString(true)).toBe(false)
    })

    it('string object', () => {
      expect(isString(new String('hello'))).toBe(false)
    })
  })
})
