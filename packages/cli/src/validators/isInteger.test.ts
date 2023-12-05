import { isInteger } from './isInteger'

describe(isInteger.name, () => {
  it('should be Array.isInteger', () => {
    expect(isInteger).toBe(Number.isInteger)
  })
})
