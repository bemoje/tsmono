import { timeIntToStringUnsafe } from './timeIntToStringUnsafe'

describe(timeIntToStringUnsafe.name, () => {
  it('returns the correct string representation for a valid input', () => {
    expect(timeIntToStringUnsafe(3723000)).toBe('01:02:03.000')
    expect(timeIntToStringUnsafe(86400000)).toBe('24:00:00.000')
    expect(timeIntToStringUnsafe(3600000)).toBe('01:00:00.000')
    expect(timeIntToStringUnsafe(0)).toBe('00:00:00.000')
  })
})
