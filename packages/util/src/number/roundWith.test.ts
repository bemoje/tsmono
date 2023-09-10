import { roundWith } from './roundWith'

describe('roundWith', () => {
  it('should round a number to a given precision', () => {
    expect(roundWith(1.2345, 2)).toEqual(1.23)
    expect(roundWith(1.2345, 3)).toEqual(1.235)
    expect(roundWith(1.2345, 0)).toEqual(1)
  })

  it('should round a number using a custom rounding function', () => {
    expect(roundWith(1.2345, 2, Math.floor)).toEqual(1.23)
    expect(roundWith(1.2345, 2, Math.ceil)).toEqual(1.24)
  })

  it('should round a negative number', () => {
    expect(roundWith(-1.2345, 2)).toEqual(-1.23)
    expect(roundWith(-1.2345, 3)).toEqual(-1.234)
  })

  it('should throw an error if the number is not finite', () => {
    expect(() => roundWith(Infinity, 2)).toThrow()
    expect(() => roundWith(-Infinity, 2)).toThrow()
  })

  it('should throw an error if the number is NaN', () => {
    expect(() => roundWith(NaN, 2)).toThrow()
  })

  it('should handle zero precision', () => {
    expect(roundWith(1.2345, 0)).toEqual(1)
    expect(roundWith(1.5, 0)).toEqual(2)
  })

  it('should handle negative precision', () => {
    expect(roundWith(123.45, -1)).toEqual(120)
    expect(roundWith(123.45, -2)).toEqual(100)
  })
})
