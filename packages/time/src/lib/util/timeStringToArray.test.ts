import { timeStringToArray } from './timeStringToArray'

describe(timeStringToArray.name, () => {
  it('should convert valid time strings to arrays', () => {
    expect(timeStringToArray('12:34:56.789')).toEqual([12, 34, 56, 789])
    expect(timeStringToArray('00:00:00.000')).toEqual([0, 0, 0, 0])
    expect(timeStringToArray('23:59:59.999')).toEqual([23, 59, 59, 999])
  })

  it('should handle leading and trailing white spaces', () => {
    expect(timeStringToArray('   12:34:56.789   ')).toEqual([12, 34, 56, 789])
    expect(timeStringToArray('  00:00:00.000  ')).toEqual([0, 0, 0, 0])
    expect(timeStringToArray('23:59:59.999   ')).toEqual([23, 59, 59, 999])
  })

  it('should throw an error for time strings with invalid format', () => {
    expect(() => timeStringToArray('12:34:56:7829')).toThrow()
    expect(() => timeStringToArray('12:34:56:')).toThrow()
    expect(() => timeStringToArray(':34:56.789')).toThrow()
    expect(() => timeStringToArray('12:34:.789')).toThrow()
    expect(() => timeStringToArray('12:34:56')).toThrow()
    expect(() => timeStringToArray('12:34:.')).toThrow()
    expect(() => timeStringToArray('12')).toThrow()
    expect(() => timeStringToArray('12:34:56:789:')).toThrow()
    expect(() => timeStringToArray('12:34:56.789.')).toThrow()
  })

  it('should throw an error for time strings with invalid values', () => {
    expect(() => timeStringToArray('24:00:00.000')).toThrow()
    expect(() => timeStringToArray('23:60:00.000')).toThrow()
    expect(() => timeStringToArray('23:59:60.000')).toThrow()
    expect(() => timeStringToArray('23:59:59.1000')).toThrow()
    expect(() => timeStringToArray('-1:00:00.000')).toThrow()
    expect(() => timeStringToArray('00:-1:00.000')).toThrow()
    expect(() => timeStringToArray('00:00:-1.000')).toThrow()
    expect(() => timeStringToArray('00:00:00.-1')).toThrow()
  })
})
