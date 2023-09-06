import { setAddMany } from './setAddMany'

describe(setAddMany.name, () => {
  it('should add each value from the iterable to the set', () => {
    const set = new Set<number>()
    const values = [1, 2, 3]
    const result = setAddMany(set, values)
    expect(result).toBe(set)
    expect(Array.from(result)).toEqual(values)
  })

  it('should add values to an already populated set', () => {
    const set = new Set<number>([1, 2, 3])
    const values = [4, 5, 6]
    const result = setAddMany(set, values)
    expect(result).toBe(set)
    expect(Array.from(result)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should add values to an empty set', () => {
    const set = new Set<number>()
    const values: number[] = []
    const result = setAddMany(set, values)
    expect(result).toBe(set)
    expect(Array.from(result)).toEqual([])
  })

  it('should throw an error if the set parameter is not of type Set', () => {
    const set = {} as Set<number>
    const values = [1, 2, 3]
    expect(() => setAddMany(set, values)).toThrow(TypeError)
  })
})
