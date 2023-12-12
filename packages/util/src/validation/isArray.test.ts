import { isArray } from './isArray'

describe(isArray.name, () => {
  it('should be Array.isArray', () => {
    expect(isArray).toBe(Array.isArray)
  })
})
