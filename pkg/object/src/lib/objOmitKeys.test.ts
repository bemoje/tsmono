import { objOmitKeys } from './objOmitKeys'

describe('objOmitKeys', () => {
  it('should delete specified keys from the object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const keys = ['a', 'b']
    const result = objOmitKeys(obj, ...keys)
    expect(result).toEqual({ c: 3 })
  })

  it('should return the same object if no keys are specified', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = objOmitKeys(obj)
    expect(result).toEqual(obj)
  })

  it('should return the same object if specified keys do not exist in the object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const keys = ['d', 'e']
    const result = objOmitKeys(obj, ...keys)
    expect(result).toEqual(obj)
  })

  it('should handle empty objects', () => {
    const obj = {}
    const keys = ['a', 'b']
    const result = objOmitKeys(obj, ...keys)
    expect(result).toEqual({})
  })

  it('should handle objects with undefined values', () => {
    const obj = { a: undefined, b: 2, c: 3 }
    const keys = ['a', 'b']
    const result = objOmitKeys(obj, ...keys)
    expect(result).toEqual({ c: 3 })
  })
})
