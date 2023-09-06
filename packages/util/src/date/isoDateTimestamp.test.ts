import { isoDateTimestamp } from './isoDateTimestamp'

describe('isoDateTimestamp', () => {
  it('should return a string', () => {
    expect(typeof isoDateTimestamp()).toBe('string')
  })

  it('should return a string with only digits', () => {
    expect(isoDateTimestamp()).toMatch(/^\d+$/)
  })

  it('should return a string with length 17', () => {
    expect(isoDateTimestamp().length).toBe(17)
  })
})
