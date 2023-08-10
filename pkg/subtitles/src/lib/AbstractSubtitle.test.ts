import { Time, TimeInterval } from '@bemoje/time'
import { AbstractSubtitle } from './AbstractSubtitle'

describe(AbstractSubtitle.name, () => {
  it('should be extensible and provide the expected properties', () => {
    class Subtitle extends AbstractSubtitle {}
    const subtitle = new Subtitle(new TimeInterval(new Time(1254), new Time(15254)), 'text')
    expect(subtitle).toBeInstanceOf(AbstractSubtitle)
    expect(subtitle).toBeInstanceOf(Subtitle)
    expect(subtitle.interval).toBeInstanceOf(TimeInterval)
    expect(subtitle.text).toBe('text')
  })
})
