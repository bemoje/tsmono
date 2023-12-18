import { createLengthValidator } from './createLengthValidator'

describe(createLengthValidator.name, () => {
  describe('when creating the validator function', () => {
    it('should throw an error if length is not an integer', () => {
      expect(() => createLengthValidator(5.5)).toThrow()
      expect(() => createLengthValidator(NaN)).toThrow()
      expect(() => createLengthValidator(Infinity)).toThrow()
    })

    it('should return a function', () => {
      const isValid = createLengthValidator(2)
      expect(typeof isValid).toBe('function')
    })

    it('should have correct name', () => {
      const isValid = createLengthValidator(2)
      expect(isValid.name).toBe('isLengthOf2')
    })
  })

  describe('when evaluating the length of an input', () => {
    const isValid = createLengthValidator(2)

    describe('valid', () => {
      it('custom object', () => {
        expect(isValid({ length: 2 })).toBe(true)
      })

      it('string', () => {
        expect(isValid('12')).toBe(true)
      })

      it('array', () => {
        expect(isValid([1, 2])).toBe(true)
      })
    })

    describe('invalid', () => {
      it('custom object', () => {
        expect(isValid({ length: 3 })).toBe(false)
      })

      it('string', () => {
        expect(isValid('123')).toBe(false)
      })

      it('array', () => {
        expect(isValid([1, 2, 3])).toBe(false)
      })
    })
  })
})
