import { timeStringToArrayUnsafe } from './timeStringToArrayUnsafe'

describe(timeStringToArrayUnsafe.name, () => {
  it('should convert a valid time string into an array of numbers', () => {
    expect(timeStringToArrayUnsafe('12:34:56')).toEqual([12, 34, 56])
    expect(timeStringToArrayUnsafe('01:02:03')).toEqual([1, 2, 3])
  })

  it('should trim leading and trailing whitespace', () => {
    expect(timeStringToArrayUnsafe('  12:34:56  ')).toEqual([12, 34, 56])
  })

  it('should handle single-digit values', () => {
    expect(timeStringToArrayUnsafe('1:2:3')).toEqual([1, 2, 3])
    expect(timeStringToArrayUnsafe('9:8:7')).toEqual([9, 8, 7])
  })

  it('should handle input with whitespace', () => {
    expect(timeStringToArrayUnsafe('  01 :  02 :   03  ')).toEqual([1, 2, 3])
  })

  it('should handle input with leading zeroes', () => {
    expect(timeStringToArrayUnsafe('001:002:003')).toEqual([1, 2, 3])
    expect(timeStringToArrayUnsafe('010:020:030')).toEqual([10, 20, 30])
  })

  it('should handle different delimiters', () => {
    expect(timeStringToArrayUnsafe('12-34-56')).toEqual([12, 34, 56])
    expect(timeStringToArrayUnsafe('12/34/56')).toEqual([12, 34, 56])
    expect(timeStringToArrayUnsafe('12.34.56')).toEqual([12, 34, 56])
  })
})
