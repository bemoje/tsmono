import { timeIntToArray } from './timeIntToArray'

describe(timeIntToArray.name, () => {
  describe('Valid inputs', () => {
    it('should return [1, 0, 0, 0] when input is 3,600,000', () => {
      expect(timeIntToArray(3600000)).toEqual([1, 0, 0, 0])
    })

    it('should return [2, 30, 0, 0] when input is 9,000,000', () => {
      expect(timeIntToArray(9000000)).toEqual([2, 30, 0, 0])
    })

    it('should return [0, 0, 1, 550] when input is 1,550', () => {
      expect(timeIntToArray(1550)).toEqual([0, 0, 1, 550])
    })

    it('should return [23, 59, 59, 999] when input is 86,399,999', () => {
      expect(timeIntToArray(86399999)).toEqual([23, 59, 59, 999])
    })
  })

  describe('Invalid inputs', () => {
    it('should throw an error when input is less than 0', () => {
      expect(() => timeIntToArray(-1)).toThrowError('Expected time int to be between 0 and 86399999. Got: -1')
    })

    it('should throw an error when input is greater than 86,399,999', () => {
      expect(() => timeIntToArray(90000000)).toThrowError(
        'Expected time int to be between 0 and 86399999. Got: 90000000',
      )
    })

    it('should throw an error when input is not an integer', () => {
      expect(() => timeIntToArray(1.5)).toThrowError('Expected time int to be between 0 and 86399999. Got: 1.5')
    })
  })
})
