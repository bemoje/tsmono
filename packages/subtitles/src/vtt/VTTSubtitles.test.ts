import { Time, TimeInterval } from '@bemoje/time'
import { VTTSubtitle } from './VTTSubtitle'
import { VTTSubtitles } from './VTTSubtitles'

describe(VTTSubtitles.name, () => {
  describe('constructor', () => {
    it('should create an instance of VTTSubtitles', () => {
      const vtt = 'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nSubtitle 1\n\n00:00:05.000 --> 00:00:10.000\nSubtitle 2'
      const subtitles = new VTTSubtitles(vtt)
      expect(subtitles).toBeInstanceOf(VTTSubtitles)
    })

    it('should parse the subtitles correctly', () => {
      const vtt = 'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nSubtitle 1\n\n00:00:05.000 --> 00:00:10.000\nSubtitle 2'
      const subtitles = new VTTSubtitles(vtt)
      expect(subtitles.subtitles.length).toBe(2)
      expect(subtitles.subtitles[0]).toBeInstanceOf(VTTSubtitle)
      expect(subtitles.subtitles[0].interval).toBeInstanceOf(TimeInterval)
      expect(subtitles.subtitles[0].interval.start).toBeInstanceOf(Time)
      expect(subtitles.subtitles[0].interval.start.hours).toBe(0)
      expect(subtitles.subtitles[0].interval.start.minutes).toBe(0)
      expect(subtitles.subtitles[0].interval.start.seconds).toBe(0)
      expect(subtitles.subtitles[0].interval.start.milliseconds).toBe(0)
      expect(subtitles.subtitles[0].interval.end).toBeInstanceOf(Time)
      expect(subtitles.subtitles[0].interval.end.hours).toBe(0)
      expect(subtitles.subtitles[0].interval.end.minutes).toBe(0)
      expect(subtitles.subtitles[0].interval.end.seconds).toBe(5)
      expect(subtitles.subtitles[0].interval.end.milliseconds).toBe(0)
      expect(subtitles.subtitles[0].text).toBe('Subtitle 1')
      expect(subtitles.subtitles[1]).toBeInstanceOf(VTTSubtitle)
      expect(subtitles.subtitles[1].interval).toBeInstanceOf(TimeInterval)
      expect(subtitles.subtitles[1].interval.start).toBeInstanceOf(Time)
      expect(subtitles.subtitles[1].interval.start.hours).toBe(0)
      expect(subtitles.subtitles[1].interval.start.minutes).toBe(0)
      expect(subtitles.subtitles[1].interval.start.seconds).toBe(5)
      expect(subtitles.subtitles[1].interval.start.milliseconds).toBe(0)
      expect(subtitles.subtitles[1].interval.end).toBeInstanceOf(Time)
      expect(subtitles.subtitles[1].interval.end.hours).toBe(0)
      expect(subtitles.subtitles[1].interval.end.minutes).toBe(0)
      expect(subtitles.subtitles[1].interval.end.seconds).toBe(10)
      expect(subtitles.subtitles[1].interval.end.milliseconds).toBe(0)
      expect(subtitles.subtitles[1].text).toBe('Subtitle 2')
    })
  })

  describe('toString', () => {
    it('should return the subtitles in VTT format', () => {
      const vtt = 'WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nSubtitle 1\n\n00:00:05.000 --> 00:00:10.000\nSubtitle 2'
      const subtitles = new VTTSubtitles(vtt)
      const vttString = subtitles.toString()
      expect(vttString).toBe(vtt)
    })
  })
})

describe('VTTSubtitle', () => {
  describe('constructor', () => {
    it('should create an instance of VTTSubtitle', () => {
      const interval = new TimeInterval(new Time(0), new Time(5))
      const text = 'Subtitle 1'
      const subtitle = new VTTSubtitle(interval, text)
      expect(subtitle).toBeInstanceOf(VTTSubtitle)
    })

    it('should set the interval and text correctly', () => {
      const interval = new TimeInterval(new Time(0), new Time(5))
      const text = 'Subtitle 1'
      const subtitle = new VTTSubtitle(interval, text)
      expect(subtitle.interval).toBe(interval)
      expect(subtitle.text).toBe(text)
    })
  })

  describe('toString', () => {
    it('should return the subtitle in VTT format', () => {
      const interval = new TimeInterval(new Time(0), new Time(5))
      const text = 'Subtitle 1'
      const subtitle = new VTTSubtitle(interval, text)
      const vttString = subtitle.toString()
      expect(vttString).toBe('00:00:00.000 --> 00:00:00.005\nSubtitle 1')
    })

    it('it should parse and render identical strings', () => {
      const string = [
        'WEBVTT',
        '',
        '00:00:01.000 --> 00:00:09.000',
        'Jeg vil gerne starte aftenen i dag med at recitere mit seneste digt.',
        '',
        '00:00:16.000 --> 00:00:22.000',
        'Dåseåbneren skær, blænder mine intetsigende, grimme øjne.',
        '',
        '00:00:23.000 --> 00:00:28.000',
        'Når jeg skærer i dåsen, kommer der ting ud af min mund.',
        '',
        '00:00:29.000 --> 00:00:31.000',
        'Det er løgne.',
      ].join('\n')
      expect(new VTTSubtitles(string).toString()).toBe(string)
    })
  })
})
