import { regexFixFlags } from './regexFixFlags'

describe('regexFixFlags', () => {
  it('should return an empty string when passed an empty string', () => {
    expect(regexFixFlags('')).toBe('')
  })

  it('should remove duplicate flags', () => {
    expect(regexFixFlags('ggg')).toBe('g')
    expect(regexFixFlags('iiii')).toBe('i')
    expect(regexFixFlags('mmmm')).toBe('m')
    expect(regexFixFlags('ssss')).toBe('s')
    expect(regexFixFlags('uuuu')).toBe('u')
    expect(regexFixFlags('yyyy')).toBe('y')
  })

  it('should remove invalid flags', () => {
    expect(regexFixFlags('a')).toBe('')
    expect(regexFixFlags('?')).toBe('')
    expect(regexFixFlags('*')).toBe('')
  })

  it('should sort flags alphabetically', () => {
    expect(regexFixFlags('gimsuy')).toBe('gimsuy')
    expect(regexFixFlags('yusmig')).toBe('gimsuy')
  })
})
