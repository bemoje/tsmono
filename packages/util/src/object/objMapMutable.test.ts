import { objMapMutable } from './objMapMutable'

describe('objMapMutable', () => {
  it('should mutate the object with the callback function', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value * 2
    const result = objMapMutable(obj, callback)
    expect(result).toEqual({ a: 2, b: 4, c: 6 })
  })

  it('should use the getKeys function if provided', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value * 2
    const getKeys = (obj: Record<string, number>) => ['a', 'b']
    const result = objMapMutable(obj, callback, getKeys)
    expect(result).toEqual({ a: 2, b: 4, c: 3 })
  })

  it('should return the same object if no keys are returned by getKeys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value * 2
    const getKeys = (obj: Record<string, number>) => []
    const result = objMapMutable(obj, callback, getKeys)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should handle an empty object', () => {
    const obj = {}
    const callback = (value: number, key: string) => value * 2
    const result = objMapMutable(obj, callback)
    expect(result).toEqual({})
  })
})
