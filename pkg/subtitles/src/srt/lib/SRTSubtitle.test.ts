import { Time, TimeInterval } from '@bemoje/time'
import { SRTSubtitle } from './SRTSubtitle'

describe(SRTSubtitle.name, () => {
  describe('constructor', () => {
    it('should create a new SRTSubtitle instance with the provided interval and text', () => {
      const interval = new TimeInterval(new Time([0, 0, 0, 0]), new Time([0, 0, 1, 0]))
      const text = 'This is a subtitle'
      const subtitle = new SRTSubtitle(interval, text)
      expect(subtitle.interval).toBe(interval)
      expect(subtitle.text).toBe(text)
    })
  })

  describe('toString', () => {
    it('should render the subtitle as a string in the SRT format', () => {
      const interval = new TimeInterval(new Time([0, 0, 0, 0]), new Time([0, 0, 1, 0]))
      const text = 'This is a subtitle'
      const expectedString = '00:00:00,000 --> 00:00:01,000\nThis is a subtitle'
      const subtitle = new SRTSubtitle(interval, text)
      const result = subtitle.toString()
      expect(result).toBe(expectedString)
    })
  })
})
