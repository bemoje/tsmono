import { assertValidDateDay } from './assertValidDateDay'

describe('assertValidDateDay', () => {
  it('accepts valid', () => {
    expect(() => assertValidDateDay(1, 1)).not.toThrowError()
    expect(() => assertValidDateDay(5, 1)).not.toThrowError()
    expect(() => assertValidDateDay(31, 1)).not.toThrowError()
  })
  it('throws on invalid', () => {
    expect(() => assertValidDateDay(0, 1)).toThrowError()
    expect(() => assertValidDateDay(32, 1)).toThrowError()
  })
})
