import { getCentury } from './getCentury'

describe('getCentury', () => {
  it('works', () => {
    expect(getCentury(0)).toBe(1)
    expect(getCentury(1)).toBe(1)
    expect(getCentury(112)).toBe(2)
    expect(getCentury(950)).toBe(10)
    expect(getCentury(1051)).toBe(11)
    expect(getCentury(2023)).toBe(21)
  })
  it('throws on invalid', () => {
    expect(() => getCentury(-1)).toThrowError()
    expect(() => getCentury(1.1)).toThrowError()
  })
})
