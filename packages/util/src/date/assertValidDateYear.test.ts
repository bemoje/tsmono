import { assertValidDateYear } from './assertValidDateYear'

describe('assertValidDateYear', () => {
  it('accepts valid', () => {
    expect(() => assertValidDateYear(0)).not.toThrowError()
    expect(() => assertValidDateYear(1)).not.toThrowError()
    expect(() => assertValidDateYear(100)).not.toThrowError()
    expect(() => assertValidDateYear(2000)).not.toThrowError()
    expect(() => assertValidDateYear(2023)).not.toThrowError()
    expect(() => assertValidDateYear(2100)).not.toThrowError()
  })
  it('throws on invalid', () => {
    expect(() => assertValidDateYear(-1)).toThrowError()
    expect(() => assertValidDateYear(1.1)).toThrowError()
  })
})
