import { Time, TimeInterval } from '@bemoje/time'
import { VTTSubtitle } from './VTTSubtitle'

/**
 * A collection of VTTSubtitles.
 */
export class VTTSubtitles {
  /**
   * The SRTSubtitle instances.
   */
  subtitles: VTTSubtitle[]

  /**
   * Create a new VTTSubtitles instance.
   * @param vtt A correctly formatted VTT subtitles string.
   */
  constructor(vtt: string) {
    this.subtitles = vtt
      .replace('WEBVTT', '')
      .trim()
      .split(/\r?\n\r?\n/)
      .map((block) => {
        const [interval, text] = block.trim().split(/\r?\n/)
        const [start, end] = interval.split(' --> ').map((s) => new Time(s))
        return new VTTSubtitle(new TimeInterval(start, end), text)
      })
  }

  /**
   * Returns the subtitles to a VTT format string.
   */
  toString(): string {
    return `WEBVTT\n\n${this.subtitles.join('\n\n')}`
  }
}
