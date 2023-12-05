import { isNamedFunctionArray } from './isNamedFunctionArray'

describe(isNamedFunctionArray.name, () => {
  describe('valid', () => {
    it('named function array', () => {
      expect(isNamedFunctionArray([function f() {}])).toBe(true)
    })
  })
  describe('invalid', () => {
    it('not named function array', () => {
      expect(isNamedFunctionArray([() => {}])).toBe(false)
    })
  })
})
