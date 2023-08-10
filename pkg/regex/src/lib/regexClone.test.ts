import { regexClone } from './regexClone'

describe('regexClone', () => {
  it('should clone a regular expression with no flags', () => {
    const regex = new RegExp('abc')
    const clonedRegex = regexClone(regex)
    expect(clonedRegex).not.toBe(regex)
    expect(clonedRegex.source).toBe(regex.source)
    expect(clonedRegex.flags).toBe(regex.flags)
  })

  it('should clone a regular expression with flags', () => {
    const regex = new RegExp('abc', 'gi')
    const clonedRegex = regexClone(regex)
    expect(clonedRegex).not.toBe(regex)
    expect(clonedRegex.source).toBe(regex.source)
    expect(clonedRegex.flags).toBe(regex.flags)
  })

  it('should clone a regular expression with special characters', () => {
    const regex = new RegExp('\\w+\\s', 'g')
    const clonedRegex = regexClone(regex)
    expect(clonedRegex).not.toBe(regex)
    expect(clonedRegex.source).toBe(regex.source)
    expect(clonedRegex.flags).toBe(regex.flags)
  })

  it('should clone a regular expression with unicode flag', () => {
    const regex = new RegExp('abc', 'u')
    const clonedRegex = regexClone(regex)
    expect(clonedRegex).not.toBe(regex)
    expect(clonedRegex.source).toBe(regex.source)
    expect(clonedRegex.flags).toBe(regex.flags)
  })

  it('should clone a regular expression with sticky flag', () => {
    const regex = new RegExp('abc', 'y')
    const clonedRegex = regexClone(regex)
    expect(clonedRegex).not.toBe(regex)
    expect(clonedRegex.source).toBe(regex.source)
    expect(clonedRegex.flags).toBe(regex.flags)
  })
})
