import { Time, TimeInterval } from '@bemoje/time'
import { SRTSubtitle } from './SRTSubtitle'

/**
 * A collection of SRTSubtitles.
 */
export class SRTSubtitles {
  /**
   * The SRTSubtitle instances.
   */
  subtitles: SRTSubtitle[]

  /**
   * Create a new SRTSubtitles instance.
   * @param string A correctly formatted SRT subtitles string.
   */
  constructor(string: string) {
    this.subtitles = string
      .trim()
      .split(/\r?\n\r?\n/)
      .map((block) => {
        const [id, interval, text] = block.trim().split(/\r?\n/)
        const [start, end] = interval.split(' --> ').map((s) => new Time(s))
        return new SRTSubtitle(new TimeInterval(start, end), text)
      })
  }

  /**
   * Returns the subtitles as a string in the SRT format.
   */
  toString(): string {
    let res = ''
    for (let i = 0; i < this.subtitles.length; i++) {
      const sub = this.subtitles[i]
      res += Number(i + 1) + '\n' + sub.toString() + '\n\n'
    }
    return res.trimEnd()
  }
}
