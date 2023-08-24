import { timeStringToInt } from './timeStringToInt'

describe(timeStringToInt.name, () => {
  it('should convert a valid time string to an integer', () => {
    expect(timeStringToInt('00:00:00.000')).toEqual(0)
    expect(timeStringToInt('01:00:00.000')).toEqual(3600000)
    expect(timeStringToInt('12:30:15.000')).toEqual(45015000)
    expect(timeStringToInt('23:59:59.000')).toEqual(86399000)
  })

  it('should throw an error for an invalid time string format', () => {
    expect(() => timeStringToInt('')).toThrow()
    expect(() => timeStringToInt('24:00:00')).toThrow()
    expect(() => timeStringToInt('00:60:00')).toThrow()
    expect(() => timeStringToInt('00:00:60')).toThrow()
    expect(() => timeStringToInt('0:0:0')).toThrow()
    expect(() => timeStringToInt('10:20')).toThrow()
    expect(() => timeStringToInt('10:20:30:40')).toThrow()
    expect(() => timeStringToInt('2:30:15')).toThrow()
  })
})
