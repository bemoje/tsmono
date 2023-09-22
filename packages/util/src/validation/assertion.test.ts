import { assertion } from './assertion'

describe(assertion.name, () => {
  describe('when the validation function returns true', () => {
    it('should return the value', () => {
      const value = 5
      const validate = jest.fn().mockReturnValue(true)
      const result = assertion(value, validate)
      expect(result).toBe(value)
      expect(validate).toHaveBeenCalledWith(value)
    })
  })

  describe('when the validation function returns false', () => {
    it('should throw a TypeError with the correct error message', () => {
      const value = 5
      const validate = jest.fn().mockReturnValue(false)
      expect(() => {
        assertion(value, validate)
      }).toThrow()
      expect(() => {
        assertion(value, validate)
      }).toThrow(`Expected '${validate.name}' to be 'true' for input: ${value}`)
      expect(validate).toHaveBeenCalledWith(value)
    })
  })

  describe('when the expectation is false', () => {
    describe('when the validation function returns true', () => {
      it('should throw a TypeError with the correct error message', () => {
        const value = 5
        const validate = jest.fn().mockReturnValue(true)
        expect(() => {
          assertion(value, validate, false)
        }).toThrow()
        expect(() => {
          assertion(value, validate, false)
        }).toThrow(`Expected '${validate.name}' to be 'false' for input: ${value}`)
        expect(validate).toHaveBeenCalledWith(value)
      })
    })

    describe('when the validation function returns false', () => {
      it('should return the value', () => {
        const value = 5
        const validate = jest.fn().mockReturnValue(false)
        const result = assertion(value, validate, false)
        expect(result).toBe(value)
        expect(validate).toHaveBeenCalledWith(value)
      })
    })
  })
})
