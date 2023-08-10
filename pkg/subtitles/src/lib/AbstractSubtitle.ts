import { TimeInterval } from '@bemoje/time'

/**
 * Abstract class represents a subtitle of no specific format.
 */
export abstract class AbstractSubtitle {
  /**
   * The time interval of the subtitle.
   */
  public interval: TimeInterval

  /**
   * The text of the subtitle.
   */
  public text: string

  /**
   * Creates a new Subtitle instance.
   * @param interval The time interval of the subtitle.
   * @param text The text of the subtitle.
   */
  constructor(interval: TimeInterval, text: string) {
    this.interval = interval
    this.text = text
  }
}
