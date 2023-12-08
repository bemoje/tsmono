import { ensureThat } from './ensureThat'

describe(ensureThat.name, () => {
  it('should validate with validator that returns boolean', () => {
    const isPositive = (n: number) => n >= 0
    try {
      ensureThat(-5, isPositive)
    } catch (error) {
      const err = error as Error
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe(`Expected '${isPositive.name}'. Got: -5`)
    }
  })
  it('should validate with validator that returns boolean or string', () => {
    const isPositive = (n: number) => (n >= 0 ? true : 'Not positive')
    try {
      ensureThat(-5, isPositive)
    } catch (error) {
      const err = error as Error
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toBe(`Not positive. Got: -5`)
    }
  })
  it('should throw the provided error type', () => {
    const isPositive = (n: number) => (n >= 0 ? true : 'Not positive')
    try {
      ensureThat(-5, isPositive, { Err: TypeError })
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
    }
  })
  it('should validate correctly using additional args', () => {
    const isLargerThan = (n: number, min: number) => n > min
    expect(() => ensureThat(5, isLargerThan, { args: [3] })).not.toThrow()
    expect(() => ensureThat(5, isLargerThan, { args: [7] })).toThrow()
  })
})
