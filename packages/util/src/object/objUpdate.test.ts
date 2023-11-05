import { ObjectKey } from '../types/ObjectKey'
import { objUpdate } from './objUpdate'

describe('objUpdate', () => {
  it('should update the value of a specific key in an object', () => {
    const obj = { a: 1, b: 2 }
    const key = 'a'
    const callback = (value: number | undefined, key: ObjectKey) => (value ? value * 2 : 0)
    const result = objUpdate(obj, key, callback)
    expect(result).toBe(2)
    expect(obj).toEqual({ a: 2, b: 2 })
  })

  it('should handle undefined values', () => {
    const obj: any = { a: undefined, b: 2 }
    const key = 'a'
    const callback = (value: number | undefined, key: ObjectKey) => (value ? value * 2 : 0)
    const result = objUpdate(obj, key, callback)
    expect(result).toBe(0)
    expect(obj).toEqual({ a: 0, b: 2 })
  })

  it('should handle non-existing keys', () => {
    const obj = { a: 1, b: 2 }
    const key = 'c'
    const callback = (value: number | undefined, key: ObjectKey) => (value ? value * 2 : 0)
    const result = objUpdate(obj, key, callback)
    expect(result).toBe(0)
    expect(obj).toEqual({ a: 1, b: 2, c: 0 })
  })

  it('should handle symbol keys', () => {
    const key = Symbol('key')
    const obj = { [key]: 1, b: 2 }
    const callback = (value: number | undefined, key: ObjectKey) => (value ? value * 2 : 0)
    const result = objUpdate(obj, key, callback)
    expect(result).toBe(2)
    expect(obj).toEqual({ [key]: 2, b: 2 })
  })
})
