import { timeStringToArrayUnsafe } from './timeStringToArrayUnsafe'
import { timeStringToIntUnsafe } from './timeStringToIntUnsafe'

describe(timeStringToIntUnsafe.name, () => {
  it('should convert a valid input string to an integer', () => {
    const input = '12:30:45.000'
    const result = timeStringToIntUnsafe(input)
    expect(result).toBe(45045000)
  })

  describe('timeStringToArrayUnsafe', () => {
    it('should convert a valid input string to an array of numbers', () => {
      const input = '12:30:45'
      const result = timeStringToArrayUnsafe(input)
      expect(result).toEqual([12, 30, 45])
    })

    it('should trim leading and trailing spaces from the input string', () => {
      const input = '  12:30:45  '
      const result = timeStringToArrayUnsafe(input)
      expect(result).toEqual([12, 30, 45])
    })

    it('should remove non-numeric characters from the input string', () => {
      const input = '12:30&45'
      const result = timeStringToArrayUnsafe(input)
      expect(result).toEqual([12, 30, 45])
    })

    it('should handle leading zeros in the input string', () => {
      const input = '00:01:02'
      const result = timeStringToArrayUnsafe(input)
      expect(result).toEqual([0, 1, 2])
    })

    it('should handle missing seconds in the input string', () => {
      const input = '12:30'
      const result = timeStringToArrayUnsafe(input)
      expect(result).toEqual([12, 30])
    })
  })
})
