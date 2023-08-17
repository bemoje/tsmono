import { arrShallowEquals } from './arrShallowEquals'

describe('arrShallowEquals', () => {
  it('example', () => {
    expect(arrShallowEquals([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true)
    expect(arrShallowEquals([1, 2, 3, 4], [1, 2, 3])).toBe(false)
  })

  it('should return true if the two arrays are shallowly equal', () => {
    const input1 = [1, 2, 3]
    const input2 = [1, 2, 3]
    expect(arrShallowEquals(input1, input2)).toBe(true)
  })

  it('should return false if the two arrays have different lengths', () => {
    const input1 = [1, 2, 3]
    const input2 = [1, 2]
    expect(arrShallowEquals(input1, input2)).toBe(false)
  })

  it('should return false if the two arrays have different elements at the same index', () => {
    const input1 = [1, 2, 3]
    const input2 = [1, 4, 3]
    expect(arrShallowEquals(input1, input2)).toBe(false)
  })

  it('should return true if both arrays are empty', () => {
    const input1: number[] = []
    const input2: number[] = []
    expect(arrShallowEquals(input1, input2)).toBe(true)
  })
})
