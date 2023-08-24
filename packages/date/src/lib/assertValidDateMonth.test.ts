import { assertValidDateMonth } from './assertValidDateMonth'

describe('assertValidDateMonth', () => {
  it('accepts valid', () => {
    expect(() => assertValidDateMonth(1)).not.toThrowError()
    expect(() => assertValidDateMonth(5)).not.toThrowError()
    expect(() => assertValidDateMonth(12)).not.toThrowError()
  })
  it('throws on invalid', () => {
    expect(() => assertValidDateMonth(0)).toThrowError()
    expect(() => assertValidDateMonth(13)).toThrowError()
  })
})
