import { createEncapsulatingRegex } from './createEncapsulatingRegex'

describe('createEncapsulatingRegex', () => {
  it('should build a regex that matches a string between two strings', () => {
    const regex = createEncapsulatingRegex('a', 'b')
    expect(regex.source).toBe('(?<left>a)(?<mid>.*?)(?=b)(?<right>b)')
  })

  it('should build a regex that matches a string between two regexes', () => {
    const regex = createEncapsulatingRegex(/a/, /b/)
    expect(regex.source).toBe('(?<left>a)(?<mid>.*?)(?=b)(?<right>b)')
  })

  it('should add "g" and "s" flags by default', () => {
    const regex = createEncapsulatingRegex('a', 'b')
    expect(regex.flags).toBe('gs')
  })

  it('should add flags passed as argument', () => {
    const regex = createEncapsulatingRegex('a', 'b', 'i')
    expect(regex.flags).toBe('gis')
  })
})
