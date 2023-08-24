import { Time, TimeInterval } from '@bemoje/time'
import { VTTSubtitle } from './VTTSubtitle'

describe(VTTSubtitle.name, () => {
  describe('constructor', () => {
    it('should create a new VTTSubtitle instance with the provided interval and text', () => {
      const interval = new TimeInterval(new Time(0), new Time(1000))
      const text = 'This is a subtitle'
      const subtitle = new VTTSubtitle(interval, text)
      expect(subtitle.interval).toBe(interval)
      expect(subtitle.text).toBe(text)
    })
  })

  describe('toString', () => {
    it('should render the subtitle as a string in the VTT format', () => {
      const interval = new TimeInterval(new Time(0), new Time(1000))
      const text = 'This is a subtitle'
      const subtitle = new VTTSubtitle(interval, text)
      const result = subtitle.toString()
      expect(result).toBe('00:00:00.000 --> 00:00:01.000\nThis is a subtitle')
    })
  })
})
