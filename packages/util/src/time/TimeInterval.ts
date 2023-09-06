import { Time } from './Time'

/**
 * Represents a time interval.
 */
export class TimeInterval {
  /**
   * The start of the interval.
   */
  public start: Time

  /**
   * The end of the interval.
   */
  public end: Time

  /**
   * Creates a new TimeInterval instance.
   * @param start The start of the interval.
   * @param end The end of the interval.
   * @throws if the start time is after the end time.
   */
  constructor(start: Time, end: Time) {
    if (start > end) throw new Error('Start time must be before end time')
    this.start = start
    this.end = end
  }

  /**
   * Returns the duration of the interval as a new Time instance.
   */
  public getDuration(): Time {
    return this.end.difference(this.start)
  }

  /**
   * Returns the interval as a string, rendering both the start and end times.
   * Renders in the format "HH:MM:SS.mmm --> HH:MM:SS.mmm", with the default delimiter being " --> ".
   * @param delimiter The delimiter between the start and end times.
   * @param msDelimiter The delimiter between seconds and milliseconds.
   */
  toString(delimiter = ' --> ', msDelimiter = '.'): string {
    return `${this.start.toString(msDelimiter)}${delimiter}${this.end.toString(msDelimiter)}`
  }
}
