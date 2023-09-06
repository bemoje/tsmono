import { objValuesArray } from './objValuesArray'

describe('objValuesArray', () => {
  it('should return an array of values from the object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = objValuesArray(obj)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an empty array if the object is empty', () => {
    const obj = {}
    const result = objValuesArray(obj)
    expect(result).toEqual([])
  })

  it('should return an array of values from the object with different types of values', () => {
    const obj = { a: 1, b: '2', c: true, d: null, e: undefined, f: { g: 'h' } }
    const result = objValuesArray(obj)
    expect(result).toEqual([1, '2', true, null, undefined, { g: 'h' }])
  })
})
