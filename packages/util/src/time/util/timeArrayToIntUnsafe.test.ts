import { timeArrayToIntUnsafe } from './timeArrayToIntUnsafe'

describe(timeArrayToIntUnsafe.name, () => {
  it('should return the correct integer for a valid time array', () => {
    expect(timeArrayToIntUnsafe([1, 30, 0, 500])).toBe(5400500)
    expect(timeArrayToIntUnsafe([5, 0, 0, 0])).toBe(18000000)
  })

  it('should return 0 for an empty array', () => {
    expect(() => timeArrayToIntUnsafe([])).not.toThrow()
  })

  it('should not throw if any of the time values are negative', () => {
    expect(() => timeArrayToIntUnsafe([-1, 30, 0, 0])).not.toThrow()
    expect(() => timeArrayToIntUnsafe([1, -30, 0, 0])).not.toThrow()
    expect(() => timeArrayToIntUnsafe([1, 30, -1, 0])).not.toThrow()
    expect(() => timeArrayToIntUnsafe([1, 30, 0, -1])).not.toThrow()
  })
})
