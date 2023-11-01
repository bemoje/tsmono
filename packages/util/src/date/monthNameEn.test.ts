import { monthNameEn } from './monthNameEn'

describe(monthNameEn.name, () => {
  it('should return the full name of the month', () => {
    const result = monthNameEn(9)
    expect(result).toBe('September')
  })

  it('should return the shortened name of the month', () => {
    const result = monthNameEn(9, 3)
    expect(result).toBe('Sep')
  })

  it('should return the shortened name of the month with maxLength equal to the length of the full name', () => {
    const result = monthNameEn(9, 9)
    expect(result).toBe('September')
  })

  it('should return an empty string if maxLength is 0', () => {
    const result = monthNameEn(9, 0)
    expect(result).toBe('')
  })

  it('should throw an error if the provided month number is not a valid month', () => {
    expect(() => monthNameEn(0)).toThrow()
    expect(() => monthNameEn(13)).toThrow()
  })
})
