import { regexGetGroupNames } from './regexGetGroupNames'

describe('regexGetGroupNames', () => {
  it('returns empty array when no groups defined', () => {
    const re = /hello (\w+) are you (\w+)/g
    expect(regexGetGroupNames(re)).toStrictEqual([])
  })

  it('gets group names', () => {
    const re = /hello (?<group1>\w+) are you (?<group2>\w+)/g
    expect(regexGetGroupNames(re)).toStrictEqual(['group1', 'group2'])
  })

  it('should return an empty array when there are no named capture groups', () => {
    const regex = /abc/g
    const result = regexGetGroupNames(regex)
    expect(result).toEqual([])
  })
})
