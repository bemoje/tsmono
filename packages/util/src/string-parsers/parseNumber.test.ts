import { parseNumber } from './parseNumber'

describe(parseNumber.name, () => {
  describe('valid', () => {
    it('zero', () => {
      expect(parseNumber('0')).toBe(0)
    })

    it('N', () => {
      expect(parseNumber('3')).toBe(3)
      expect(parseNumber('-3')).toBe(-3)
    })

    it('R', () => {
      expect(parseNumber('3.1')).toBe(3.1)
      expect(parseNumber('-3.1')).toBe(-3.1)
    })

    it('Infinity', () => {
      expect(parseNumber('Infinity')).toBe(Infinity)
    })

    it('-Infinity', () => {
      expect(parseNumber('-Infinity')).toBe(-Infinity)
    })

    it('NaN', () => {
      expect(parseNumber('NaN')).toBe(NaN)
    })

    it('spaces', () => {
      expect(parseNumber('1. 215')).toBe(1.215)
    })

    it('thousand separator', () => {
      expect(parseNumber('1,000,215.25')).toBe(1000215.25)
    })

    it('units', () => {
      expect(parseNumber('$12')).toBe(12)
    })
  })

  describe('invalid', () => {
    it('empty string', () => {
      expect(parseNumber('')).toBe(NaN)
    })

    it('alpha', () => {
      expect(parseNumber('asdf')).toBe(NaN)
    })
  })
})
