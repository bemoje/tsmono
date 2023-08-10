import { Time } from './Time'

describe(Time.name, () => {
  describe('constructor', () => {
    it('should create a Time instance with the provided millisecond value', () => {
      const time = new Time(3600000)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should create a Time instance with the provided time string', () => {
      const time = new Time('01:00:00.000')
      expect(time.valueOf()).toBe(1000 * 60 * 60)
    })

    it('should create a Time instance with the provided time array', () => {
      const time = new Time([1, 0, 0, 0])
      expect(time.valueOf()).toBe(3600000)
    })

    it('should throw an error if the provided millisecond value is invalid', () => {
      expect(() => new Time(-1)).toThrow()
      expect(() => new Time(86400000)).toThrow()
    })

    it('should throw an error if the provided time string is invalid', () => {
      expect(() => new Time('25:00:00')).toThrow()
      expect(() => new Time('01:60:00')).toThrow()
      expect(() => new Time('01:00:60')).toThrow()
      expect(() => new Time('01:00:00.1000')).toThrow()
    })

    it('should throw an error if the provided time array is invalid', () => {
      expect(() => new Time([24, 0, 0, 0])).toThrow()
      expect(() => new Time([1, 60, 0, 0])).toThrow()
      expect(() => new Time([1, 0, 60, 0])).toThrow()
      expect(() => new Time([1, 0, 0, 1000])).toThrow()
    })
  })

  describe('addHours', () => {
    it('should add the specified amount of hours to the current time', () => {
      const time = new Time(0)
      time.addHours(1)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(0)
      time.addHours(1.5)
      expect(time.valueOf()).toBe(5400000)
    })

    it('should allow negative values', () => {
      const time = new Time(3600000)
      time.addHours(-1)
      expect(time.valueOf()).toBe(0)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(0)
      expect(() => time.addHours(24)).toThrow()
    })
  })

  describe('addMinutes', () => {
    it('should add the specified amount of minutes to the current time', () => {
      const time = new Time(0)
      time.addMinutes(60)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(0)
      time.addMinutes(90.5)
      expect(time.valueOf()).toBe(5430000)
    })

    it('should allow negative values', () => {
      const time = new Time(3600000)
      time.addMinutes(-60)
      expect(time.valueOf()).toBe(0)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(0)
      expect(() => time.addMinutes(1440)).toThrow()
    })
  })

  describe('addSeconds', () => {
    it('should add the specified amount of seconds to the current time', () => {
      const time = new Time(0)
      time.addSeconds(3600)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(0)
      time.addSeconds(5400.5)
      expect(time.valueOf()).toBe(5400.5 * 1000)
    })

    it('should allow negative values', () => {
      const time = new Time(3600000)
      time.addSeconds(-3600)
      expect(time.valueOf()).toBe(0)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(0)
      expect(() => time.addSeconds(86400)).toThrow()
    })
  })

  describe('addMilliseconds', () => {
    it('should add the specified amount of milliseconds to the current time', () => {
      const time = new Time(0)
      time.addMilliseconds(3600000)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should allow negative values', () => {
      const time = new Time(3600000)
      time.addMilliseconds(-3600000)
      expect(time.valueOf()).toBe(0)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(0)
      expect(() => time.addMilliseconds(86400000)).toThrow()
    })
  })

  describe('subtractHours', () => {
    it('should subtract the specified amount of hours from the current time', () => {
      const time = new Time(3600000)
      time.subtractHours(1)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(5400000)
      time.subtractHours(1.5)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow negative values', () => {
      const time = new Time(0)
      time.subtractHours(-1)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(3600000)
      expect(() => time.subtractHours(24)).toThrow()
    })
  })

  describe('subtractMinutes', () => {
    it('should subtract the specified amount of minutes from the current time', () => {
      const time = new Time(3600000)
      time.subtractMinutes(60)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(5430000)
      time.subtractMinutes(90.5)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow negative values', () => {
      const time = new Time(0)
      time.subtractMinutes(-60)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(3600000)
      expect(() => time.subtractMinutes(1440)).toThrow()
    })
  })

  describe('subtractSeconds', () => {
    it('should subtract the specified amount of seconds from the current time', () => {
      const time = new Time(3600000)
      time.subtractSeconds(3600)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow floating point numbers', () => {
      const time = new Time(5430500)
      time.subtractSeconds(5400.5)
      expect(time.valueOf()).toBe(5430500 - 5400.5 * 1000)
    })

    it('should allow negative values', () => {
      const time = new Time(0)
      time.subtractSeconds(-3600)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(3600000)
      expect(() => time.subtractSeconds(86400)).toThrow()
    })
  })

  describe('subtractMilliseconds', () => {
    it('should subtract the specified amount of milliseconds from the current time', () => {
      const time = new Time(3600000)
      time.subtractMilliseconds(3600000)
      expect(time.valueOf()).toBe(0)
    })

    it('should allow negative values', () => {
      const time = new Time(0)
      time.subtractMilliseconds(-3600000)
      expect(time.valueOf()).toBe(3600000)
    })

    it('should throw an error if the time becomes invalid', () => {
      const time = new Time(3600000)
      expect(() => time.subtractMilliseconds(86400000)).toThrow()
    })
  })

  describe('hours', () => {
    it('should return the hours of the current time', () => {
      const time = new Time(3600000)
      expect(time.hours).toBe(1)
    })

    it('should set the hours', () => {
      const time = new Time(3600000)
      time.hours = 2
      expect(time.hours).toBe(2)
    })

    it('should throw if setting invalid hours', () => {
      const time = new Time(3600000)
      expect(() => (time.hours = 25)).toThrow()
    })
  })

  describe('minutes', () => {
    it('should return the minutes of the current time', () => {
      const time = new Time(3600000)
      expect(time.minutes).toBe(0)
    })

    it('should set the minutes', () => {
      const time = new Time(3600000)
      time.minutes = 2
      expect(time.minutes).toBe(2)
    })

    it('should throw if setting invalid minutes', () => {
      const time = new Time(3600000)
      expect(() => (time.minutes = 80)).toThrow()
    })
  })

  describe('seconds', () => {
    it('should return the seconds of the current time', () => {
      const time = new Time(3600000)
      expect(time.seconds).toBe(0)
    })

    it('should set the seconds', () => {
      const time = new Time(3600000)
      time.seconds = 2
      expect(time.seconds).toBe(2)
    })

    it('should throw if setting invalid seconds', () => {
      const time = new Time(3600000)
      expect(() => (time.seconds = 80)).toThrow()
    })
  })

  describe('milliseconds', () => {
    it('should return the milliseconds of the current time', () => {
      const time = new Time(3600000)
      expect(time.milliseconds).toBe(0)
    })

    it('should set the milliseconds', () => {
      const time = new Time(3600000)
      time.milliseconds = 2
      expect(time.milliseconds).toBe(2)
    })

    it('should throw if setting invalid milliseconds', () => {
      const time = new Time(3600000)
      expect(() => (time.milliseconds = 1000)).toThrow()
    })
  })

  describe('toArray', () => {
    it('should return the current time as an array', () => {
      const time = new Time(3600000)
      expect(time.toArray()).toEqual([1, 0, 0, 0])
    })
  })

  describe('toString', () => {
    it('should return the current time as a string', () => {
      const time = new Time(3600000)
      expect(time.toString()).toBe('01:00:00.000')
    })

    it('should allow custom delimiters', () => {
      const time = new Time(3600000)
      expect(time.toString('-')).toBe('01:00:00-000')
    })
  })

  describe('toNumber', () => {
    it('should return the current time as a number', () => {
      const time = new Time(3600000)
      expect(time.toNumber()).toBe(3600000)
    })
  })

  describe('valueOf', () => {
    it('should return the current time as a number', () => {
      const time = new Time(3600000)
      expect(time.valueOf()).toBe(3600000)
    })
  })

  describe('compareTo', () => {
    it('should return a negative number if the current time is less than the other time', () => {
      const time1 = new Time(3600000)
      const time2 = new Time(7200000)
      expect(time1.compareTo(time2)).toBeLessThan(0)
    })

    it('should return 0 if the current time is equal to the other time', () => {
      const time1 = new Time(3600000)
      const time2 = new Time(3600000)
      expect(time1.compareTo(time2)).toBe(0)
    })

    it('should return a positive number if the current time is greater than the other time', () => {
      const time1 = new Time(7200000)
      const time2 = new Time(3600000)
      expect(time1.compareTo(time2)).toBeGreaterThan(0)
    })
  })

  describe('difference', () => {
    it('should return a new Time instance representing the difference between the current time and the other time', () => {
      const time1 = new Time(3600000)
      const time2 = new Time(7200000)
      const difference = time1.difference(time2)
      expect(difference.valueOf()).toBe(3600000)
    })
  })

  describe('clone', () => {
    it('should return a new Time instance with the same millisecond value as the current time', () => {
      const time = new Time(3600000)
      const clone = time.clone()
      expect(clone.valueOf()).toBe(3600000)
    })
  })
})
