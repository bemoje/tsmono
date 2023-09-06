import { assertValidDate } from './assertValidDate'

describe('assertValidDate', () => {
  it('accepts valid', () => {
    expect(() => assertValidDate(2021, 2, 25, 13, 14, 52, 142)).not.toThrowError()
  })

  it('throws on invalid month', () => {
    expect(() => assertValidDate(2021, 0, 25)).toThrowError()
  })

  it('should not throw an error for a valid date', () => {
    expect(() => assertValidDate(2022, 1, 1, 0, 0, 0, 0)).not.toThrow()
  })

  it('should throw an error for an invalid date', () => {
    expect(() => assertValidDate(2022, 13, 1, 0, 0, 0, 0)).toThrow()
  })

  it('should throw an error for a non-existent date', () => {
    expect(() => assertValidDate(2022, 2, 30, 0, 0, 0, 0)).toThrow()
  })

  it('should not throw an error for a date with string parameters', () => {
    expect(() => assertValidDate('2022', '1', '1', '0', '0', '0', '0')).not.toThrow()
  })

  it('should throw an error for a date with non-numeric string parameters', () => {
    expect(() => assertValidDate('2022', 'January', '1', '0', '0', '0', '0')).toThrow()
  })
})
