import { intRangeMax } from './intRangeMax'
import { intRangeMin } from './intRangeMin'
import { randomInt } from './randomInt'

describe(randomInt.name, () => {
  it('should generate a random integer within the range for unsigned integers', () => {
    const min = intRangeMin('unsigned', 8)
    const max = intRangeMax('unsigned', 8)
    const result = randomInt('unsigned', 8)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  it('should generate a random integer within the range for signed integers', () => {
    const min = intRangeMin('signed', 8)
    const max = intRangeMax('signed', 8)
    const result = randomInt('signed', 8)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  it('should throw an error if bits is not a positive integer', () => {
    expect(() => randomInt('unsigned', -8)).toThrow()
    expect(() => randomInt('unsigned', 1.5)).toThrow()
    expect(() => randomInt('unsigned', NaN)).toThrow()
    expect(() => randomInt('unsigned', Infinity)).toThrow()
  })
})
