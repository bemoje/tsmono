import { UUID } from './UUID'

describe('UUID', () => {
  it('should throw an error when bits is less than 32', () => {
    expect(() => UUID(31)).toThrow('UUID must be at least 32 bits.')
  })

  it('should return a string', () => {
    expect(typeof UUID()).toBe('string')
  })

  it('should work with alternative encodings', () => {
    expect(UUID(128, 'hex')).toHaveLength(35)
  })
})
