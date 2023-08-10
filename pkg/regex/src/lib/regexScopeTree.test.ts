import { regexScopeTree } from './regexScopeTree'

describe('regexScopeTree', () => {
  const parenthesesTree = regexScopeTree('(', /\)/)
  const string = '((3+(2))+(1))'
  const resExample = {
    depth: 2,
    left: {
      index: 4,
      lastIndex: 5,
      groups: {},
      match: '(',
    },
    right: {
      index: 6,
      lastIndex: 7,
      groups: {},
      match: ')',
    },
    between: {
      index: 5,
      lastIndex: 6,
      groups: {},
      match: '2',
    },
    children: [],
  }

  it('should return only root nodes when yieldOnlyRootNodes is true', () => {
    const result = [...parenthesesTree(string, true)]
    expect(result).toHaveLength(1)
    expect(result[0].depth).toBe(0)
    expect(result[0].between.match).toBe('(3+(2))+(1)')
    expect(result[0].children[1].children[0]).toEqual(resExample)
  })

  it('should return an array of scope nodes', () => {
    const result = [...parenthesesTree(string, false)]
    expect(result).toHaveLength(4)
    expect(result[0]).toEqual(resExample)
  })
})
