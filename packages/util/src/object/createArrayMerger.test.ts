import { createArrayMerger } from './createArrayMerger'

describe(createArrayMerger.name, () => {
  it('should merge arrays based on the predicate function', () => {
    const merge = createArrayMerger<number>((value) => value != null)
    const target = [1, 3, 5, 7]
    const source1 = [2, 4, 6]
    const result = merge(target, source1)
    expect(result).toEqual([2, 4, 6, 7])
  })
})
