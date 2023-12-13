import { parseInteger } from './parseInteger'

describe(parseInteger.name, () => {
  describe('valid', () => {
    it('zero', () => {
      expect(parseInteger('0')).toBe(0)
    })

    it('N', () => {
      expect(parseInteger('3')).toBe(3)
      expect(parseInteger('-3')).toBe(-3)
    })

    it('spaces', () => {
      expect(parseInteger('1, 215')).toBe(1215)
    })

    it('thousand separator', () => {
      expect(parseInteger('1,000,215')).toBe(1000215)
    })

    it('units', () => {
      expect(parseInteger('$12')).toBe(12)
    })
  })

  describe('throw on invalid', () => {
    it('R', () => {
      expect(() => parseInteger('3.1')).toThrow()
    })

    it('Infinity', () => {
      expect(() => parseInteger('Infinity')).toThrow()
    })

    it('-Infinity', () => {
      expect(() => parseInteger('-Infinity')).toThrow()
    })

    it('NaN', () => {
      expect(() => parseInteger('NaN')).toThrow()
    })

    it('empty string', () => {
      expect(() => parseInteger('')).toThrow()
    })

    it('alpha', () => {
      expect(() => parseInteger('asdf')).toThrow()
    })
  })
})
