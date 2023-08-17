import { stemmer } from './stemmer'

describe('', () => {
  it('should work', () => {
    expect(stemmer('considerations')).toBe('consider')
    expect(stemmer('detestable')).toBe('detest')
    expect(stemmer('vileness')).toBe('vile')
  })
})
