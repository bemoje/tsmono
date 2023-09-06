import { Time } from './Time'
import { TimeInterval } from './TimeInterval'

describe(TimeInterval.name, () => {
  describe('constructor', () => {
    it('should create a new TimeInterval instance with valid start and end times', () => {
      const start = new Time('00:00:00.000')
      const end = new Time('01:00:00.000')
      const interval = new TimeInterval(start, end)
      expect(interval.start).toBe(start)
      expect(interval.end).toBe(end)
    })

    it('should throw an error if the start time is after the end time', () => {
      const start = new Time('01:00:00.000')
      const end = new Time('00:00:00.000')
      expect(() => new TimeInterval(start, end)).toThrowError('Start time must be before end time')
    })
  })

  describe('getDuration', () => {
    it('should return the duration of the interval as a Time instance', () => {
      const start = new Time('00:00:00.000')
      const end = new Time('01:00:00.000')
      const interval = new TimeInterval(start, end)
      const duration = interval.getDuration()
      expect(duration).toBeInstanceOf(Time)
      expect(duration.hours).toBe(1)
      expect(duration.minutes).toBe(0)
      expect(duration.seconds).toBe(0)
      expect(duration.milliseconds).toBe(0)
    })
  })

  describe('toString', () => {
    it('should return the interval as a string in the format "HH:MM:SS.mmm --> HH:MM:SS.mmm"', () => {
      const start = new Time('00:00:00.000')
      const end = new Time('01:00:00.000')
      const interval = new TimeInterval(start, end)
      const str = interval.toString()
      expect(str).toBe('00:00:00.000 --> 01:00:00.000')
    })

    it('should use the provided delimiter between the start and end times', () => {
      const start = new Time('00:00:00.000')
      const end = new Time('01:00:00.000')
      const interval = new TimeInterval(start, end)
      const str = interval.toString(' to ')
      expect(str).toBe('00:00:00.000 to 01:00:00.000')
    })

    it('should use the provided milliseconds delimiter', () => {
      const start = new Time('00:00:00.000')
      const end = new Time('01:00:00.000')
      const interval = new TimeInterval(start, end)
      const str = interval.toString(' --> ', ',')
      expect(str).toBe('00:00:00,000 --> 01:00:00,000')
    })
  })
})
