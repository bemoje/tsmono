import { errorToString } from './errorToString'

describe(errorToString.name, () => {
  it('should parse type name and message of an Error object.', () => {
    try {
      throw new TypeError('oops')
    } catch (error) {
      expect(errorToString(error)).toBe('TypeError: oops')
    }
  })

  it('should parse a thrown non-error object.', () => {
    try {
      throw 'oops'
    } catch (error) {
      expect(errorToString(error)).toBe('Error: oops')
    }
  })
})
