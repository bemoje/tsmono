import { assertValidHours } from './util/assertValidHours'
import { assertValidMilliseconds } from './util/assertValidMilliseconds'
import { assertValidMinutes } from './util/assertValidMinutes'
import { assertValidSeconds } from './util/assertValidSeconds'
import { assertValidTimeInt } from './util/assertValidTimeInt'
import { timeArrayToInt } from './util/timeArrayToInt'
import { timeIntToArrayUnsafe } from './util/timeIntToArrayUnsafe'
import { timeIntToStringUnsafe } from './util/timeIntToStringUnsafe'
import { timeStringToInt } from './util/timeStringToInt'

/**
 * Represents a time of day or a duration.
 * Precision is from hours to miliseconds.
 */
export class Time {
  /**
   * The time in millisecond representation.
   * This is the only value stored internally.
   */
  protected ms: number

  /**
   * Creates a new Time instance.
   * @param input The time in millisecond representation, or a string in the format "HH:MM:SS.mmm", or an array in the format [HH, MM, SS, mmm].
   * @throws if the time is invalid.
   */
  constructor(input: number | string | number[]) {
    if (typeof input === 'number') {
      assertValidTimeInt(input as number)
      this.ms = input as number
    } else if (typeof input === 'string') {
      this.ms = timeStringToInt(input as string)
    } else {
      this.ms = timeArrayToInt(input as number[])
    }
  }

  /**
   * Adds the specified amount of hours to the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param hours The amount of hours to add.
   * @throws if the time becomes invalid after the operation.
   */
  addHours(hours: number): this {
    this.ms += hours * 3600000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Adds the specified amount of minutes to the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param minutes The amount of minutes to add.
   * @throws if the time becomes invalid after the operation.
   */
  addMinutes(minutes: number): this {
    this.ms += minutes * 60000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Adds the specified amount of seconds to the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param seconds The amount of seconds to add.
   * @throws if the time becomes invalid after the operation.
   */
  addSeconds(seconds: number): this {
    this.ms += seconds * 1000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Adds the specified amount of milliseconds to the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param milliseconds The amount of milliseconds to add.
   * @throws if the time becomes invalid after the operation.
   */
  addMilliseconds(milliseconds: number): this {
    this.ms += milliseconds
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Subtracts the specified amount of hours from the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param hours The amount of hours to subtract.
   * @throws if the time becomes invalid after the operation.
   */
  subtractHours(hours: number): this {
    this.ms -= hours * 3600000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Subtracts the specified amount of minutes from the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param minutes The amount of minutes to subtract.
   * @throws if the time becomes invalid after the operation.
   */
  subtractMinutes(minutes: number): this {
    this.ms -= minutes * 60000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Subtracts the specified amount of seconds from the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param seconds The amount of seconds to subtract.
   * @throws if the time becomes invalid after the operation.
   */
  subtractSeconds(seconds: number): this {
    this.ms -= seconds * 1000
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Subtracts the specified amount of milliseconds from the current time.
   * Floating point numbers, neative values and otherwise out of bounds values are allowed unless they would cause the time to become invalid.
   * @param milliseconds The amount of milliseconds to subtract.
   * @throws if the time becomes invalid after the operation.
   */
  subtractMilliseconds(milliseconds: number): this {
    this.ms -= milliseconds
    assertValidTimeInt(this.ms)
    return this
  }

  /**
   * Returns the hours.
   */
  get hours(): number {
    return Math.floor(this.ms / 3600000)
  }

  /**
   * Set the hours to a specified value.
   * @param value The value to set the hours to.
   * @throws if the value is invalid.
   */
  set hours(value: number) {
    assertValidHours(value)
    this.addHours(value - this.hours)
  }

  /**
   * Returns the minutes.
   */
  get minutes(): number {
    return Math.floor(this.ms / 60000) % 60
  }

  /**
   * Set the minutes to a specified value.
   * @param value The value to set the minutes to.
   * @throws if the value is invalid.
   */
  set minutes(value: number) {
    assertValidMinutes(value)
    this.addMinutes(value - this.minutes)
  }

  /**
   * Returns the seconds.
   */
  get seconds(): number {
    return Math.floor(this.ms / 1000) % 60
  }

  /**
   * Set the seconds to a specified value.
   * @param value The value to set the seconds to.
   * @throws if the value is invalid.
   */
  set seconds(value: number) {
    assertValidSeconds(value)
    this.addSeconds(value - this.seconds)
  }

  /**
   * Returns the milliseconds.
   */
  get milliseconds(): number {
    return this.ms % 1000
  }

  /**
   * Set the milliseconds to a specified value.
   * @param value The value to set the milliseconds to.
   * @throws if the value is invalid.
   */
  set milliseconds(value: number) {
    assertValidMilliseconds(value)
    this.addMilliseconds(value - this.ms)
  }

  /**
   * Returns the time as an array in the format [HH, MM, SS, mmm].
   */
  toArray(): number[] {
    return timeIntToArrayUnsafe(this.ms)
  }

  /**
   * Returns the time as a string in the format "HH:MM:SS.mmm".
   * @param msDelimiter The delimiter between seconds and milliseconds.
   */
  toString(msDelimiter = '.'): string {
    return timeIntToStringUnsafe(this.ms, msDelimiter)
  }

  /**
   * Returns the time in millisecond representation.
   */
  toNumber(): number {
    return this.ms
  }

  /**
   * Returns the time in millisecond representation.
   */
  valueOf(): number {
    return this.ms
  }

  /**
   * Compares this instance to another by comparing millisecond representations.
   * @see difference for getting the difference as a new Time instance.
   * @param other The other Time instance to compare to.
   */
  compareTo(other: Time): number {
    return this.ms - other.ms
  }

  /**
   * Returns a new Time instance that represents the time difference between this instance and another.
   * @see compareTo for getting the difference in milliseconds.
   * @param other The other Time instance to compare to.
   */
  difference(other: Time): Time {
    return new Time(Math.abs(this.compareTo(other)))
  }

  /**
   * Returns a new Time instance.
   */
  clone(): Time {
    return new Time(this.ms)
  }
}
