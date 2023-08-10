import { assertValidTime } from './assertValidTime'
import { assertValidTimeArray } from './assertValidTimeArray'
import { timeArrayToInt } from './timeArrayToInt'

describe(timeArrayToInt.name, () => {
  describe('assertValidTime', () => {
    it('should not throw an error if all values are valid', () => {
      expect(() => {
        assertValidTime(0, 0, 0, 0)
      }).not.toThrow()
    })

    it('should throw an error if hours is less than 0', () => {
      expect(() => {
        assertValidTime(-1, 0, 0, 0)
      }).toThrowError('Expected hours to be between 0 and 23. Got: -1')
    })

    it('should throw an error if hours is greater than 23', () => {
      expect(() => {
        assertValidTime(24, 0, 0, 0)
      }).toThrowError('Expected hours to be between 0 and 23. Got: 24')
    })

    it('should throw an error if minutes is less than 0', () => {
      expect(() => {
        assertValidTime(0, -1, 0, 0)
      }).toThrowError('Expected minutes to be between 0 and 59. Got: -1')
    })

    it('should throw an error if minutes is greater than 59', () => {
      expect(() => {
        assertValidTime(0, 60, 0, 0)
      }).toThrowError('Expected minutes to be between 0 and 59. Got: 60')
    })

    it('should throw an error if seconds is less than 0', () => {
      expect(() => {
        assertValidTime(0, 0, -1, 0)
      }).toThrowError('Expected seconds to be between 0 and 59. Got: -1')
    })

    it('should throw an error if seconds is greater than 59', () => {
      expect(() => {
        assertValidTime(0, 0, 60, 0)
      }).toThrowError('Expected seconds to be between 0 and 59. Got: 60')
    })

    it('should throw an error if milliseconds is less than 0', () => {
      expect(() => {
        assertValidTime(0, 0, 0, -1)
      }).toThrowError('Expected milliseconds to be between 0 and 999. Got: -1')
    })

    it('should throw an error if milliseconds is greater than 999', () => {
      expect(() => {
        assertValidTime(0, 0, 0, 1000)
      }).toThrowError('Expected milliseconds to be between 0 and 999. Got: 1000')
    })
  })

  describe('assertValidTimeArray', () => {
    it('should not throw an error if the array is valid', () => {
      expect(() => {
        assertValidTimeArray([0, 0, 0, 0])
      }).not.toThrow()
    })

    it('should throw an error if the array has less than 4 elements', () => {
      expect(() => {
        assertValidTimeArray([0, 0, 0])
      }).toThrowError('Expected array of length 4.')
    })

    it('should throw an error if the array has more than 4 elements', () => {
      expect(() => {
        assertValidTimeArray([0, 0, 0, 0, 0])
      }).toThrowError('Expected array of length 4.')
    })

    it('should throw an error if any of the values are invalid', () => {
      expect(() => {
        assertValidTimeArray([24, 0, 0, 0])
      }).toThrowError('Expected hours to be between 0 and 23. Got: 24')
      expect(() => {
        assertValidTimeArray([0, 60, 0, 0])
      }).toThrowError('Expected minutes to be between 0 and 59. Got: 60')
      expect(() => {
        assertValidTimeArray([0, 0, 60, 0])
      }).toThrowError('Expected seconds to be between 0 and 59. Got: 60')
      expect(() => {
        assertValidTimeArray([0, 0, 0, 1000])
      }).toThrowError('Expected milliseconds to be between 0 and 999. Got: 1000')
    })
  })

  describe('timeArrayToInt', () => {
    it('should return the correct integer value for valid time array', () => {
      expect(timeArrayToInt([0, 0, 0, 0])).toBe(0)
      expect(timeArrayToInt([1, 0, 0, 0])).toBe(3600000)
      expect(timeArrayToInt([0, 1, 0, 0])).toBe(60000)
      expect(timeArrayToInt([0, 0, 1, 0])).toBe(1000)
      expect(timeArrayToInt([0, 0, 0, 1])).toBe(1)
      expect(timeArrayToInt([1, 1, 1, 1])).toBe(3661001)
      expect(timeArrayToInt([23, 59, 59, 999])).toBe(86399999)
    })

    it('should throw an error if the array is not a valid time array', () => {
      expect(() => {
        timeArrayToInt([])
      }).toThrowError('Expected array of length 4.')
      expect(() => {
        timeArrayToInt([0, 0, 0])
      }).toThrowError('Expected array of length 4.')
      expect(() => {
        timeArrayToInt([24, 0, 0, 0])
      }).toThrowError('Expected hours to be between 0 and 23. Got: 24')
      expect(() => {
        timeArrayToInt([0, 60, 0, 0])
      }).toThrowError('Expected minutes to be between 0 and 59. Got: 60')
      expect(() => {
        timeArrayToInt([0, 0, 60, 0])
      }).toThrowError('Expected seconds to be between 0 and 59. Got: 60')
      expect(() => {
        timeArrayToInt([0, 0, 0, 1000])
      }).toThrowError('Expected milliseconds to be between 0 and 999. Got: 1000')
    })
  })
})
