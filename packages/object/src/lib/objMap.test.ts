import { objMap } from './objMap'

describe('objMap', () => {
  it('should map over the values of an object and return a new object with the mapped values', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value * 2
    const result = objMap(object, callback)
    expect(result).toEqual({ a: 2, b: 4, c: 6 })
  })

  it('should return an empty object if the input object is empty', () => {
    const object = {}
    const callback = (value: number, key: string) => value * 2
    const result = objMap(object, callback)
    expect(result).toEqual({})
  })

  it('should return the same object if the callback function does not change the values', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value
    const result = objMap(object, callback)
    expect(result).toEqual(object)
  })

  it('should not mutate the original object', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = (value: number, key: string) => value * 2
    const originalObject = { ...object }
    objMap(object, callback)
    expect(object).toEqual(originalObject)
  })
})
