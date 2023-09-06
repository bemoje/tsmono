import { Time, TimeInterval } from '@bemoje/util'
import { SRTSubtitle } from './SRTSubtitle'
import { SRTSubtitles } from './SRTSubtitles'

describe(SRTSubtitles.name, () => {
  describe('constructor', () => {
    it('should create an instance of SRTSubtitles', () => {
      const srtString = [
        '1',
        '00:00:01,000 --> 00:00:02,000',
        'This is the first subtitle',
        '',
        '2',
        '00:00:03,000 --> 00:00:04,000',
        'This is the second subtitle',
      ].join('\n')
      const subtitles = new SRTSubtitles(srtString)
      expect(subtitles).toBeInstanceOf(SRTSubtitles)
    })

    it('should parse the subtitles correctly', () => {
      const srtString = [
        '1',
        '00:00:01,000 --> 00:00:02,000',
        'This is the first subtitle',
        '',
        '2',
        '00:00:03,000 --> 00:00:04,000',
        'This is the second subtitle',
      ].join('\n')
      const subtitles = new SRTSubtitles(srtString)
      expect(subtitles.subtitles.length).toBe(2)
      expect(subtitles.subtitles[0]).toBeInstanceOf(SRTSubtitle)
      expect(subtitles.subtitles[0].interval).toBeInstanceOf(TimeInterval)
      expect(subtitles.subtitles[0].interval.start).toBeInstanceOf(Time)
      expect(subtitles.subtitles[0].interval.start.toString()).toBe('00:00:01.000')
      expect(subtitles.subtitles[0].interval.end).toBeInstanceOf(Time)
      expect(subtitles.subtitles[0].interval.end.toString()).toBe('00:00:02.000')
      expect(subtitles.subtitles[0].text).toBe('This is the first subtitle')
      expect(subtitles.subtitles[1]).toBeInstanceOf(SRTSubtitle)
      expect(subtitles.subtitles[1].interval).toBeInstanceOf(TimeInterval)
      expect(subtitles.subtitles[1].interval.start).toBeInstanceOf(Time)
      expect(subtitles.subtitles[1].interval.start.toString()).toBe('00:00:03.000')
      expect(subtitles.subtitles[1].interval.end).toBeInstanceOf(Time)
      expect(subtitles.subtitles[1].interval.end.toString()).toBe('00:00:04.000')
      expect(subtitles.subtitles[1].text).toBe('This is the second subtitle')
    })
  })

  describe('toString', () => {
    it('should return the subtitles as a string in the SRT format', () => {
      const srtString = [
        '1',
        '00:00:01,000 --> 00:00:02,000',
        'This is the first subtitle',
        '',
        '2',
        '00:00:03,000 --> 00:00:04,000',
        'This is the second subtitle',
      ].join('\n')

      const subtitles = new SRTSubtitles(srtString)
      const result = subtitles.toString()
      expect(result).toBe(srtString.trim())
    })

    it('it should parse and render identical strings', () => {
      const string = [
        '1',
        '00:00:01,000 --> 00:00:09,000',
        'Jeg vil gerne starte aftenen i dag med at recitere mit seneste digt.',
        '',
        '2',
        '00:00:16,000 --> 00:00:22,000',
        'Dåseåbneren skær, blænder mine intetsigende, grimme øjne.',
        '',
        '3',
        '00:00:23,000 --> 00:00:28,000',
        'Når jeg skærer i dåsen, kommer der ting ud af min mund.',
        '',
        '4',
        '00:00:29,000 --> 00:00:31,000',
        'Det er løgne.',
      ].join('\n')
      expect(new SRTSubtitles(string).toString()).toBe(string)
    })
  })
})
