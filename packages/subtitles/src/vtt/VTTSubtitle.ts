import { AbstractSubtitle } from '../core/AbstractSubtitle'
import { TimeInterval } from '@bemoje/util'

/**
 * Represents a single subtitle in the VTT format.
 */
export class VTTSubtitle extends AbstractSubtitle {
  /**
   * Creates a new VTTSubtitle instance.
   * @param interval The time interval of the subtitle.
   * @param text The text of the subtitle.
   */
  constructor(interval: TimeInterval, text: string) {
    super(interval, text)
  }

  /**
   * Renders the subtitle as a string in the VTT format.
   */
  override toString(): string {
    return `${this.interval.toString(' --> ', '.')}\n${this.text}`
  }
}
