import { Any } from '../types/Any'
import { objFilterMutable } from './objFilterMutable'

describe(objFilterMutable.name, () => {
  it('can filter properties', () => {
    const o = { a: 25, b: 'asd', c: true }
    const res = objFilterMutable(o, (value, key) => value === 25 && key === 'a')
    expect(res).toEqual({ a: 25 })
  })

  it('is mutable', () => {
    const o = { a: 25, b: 'asd', c: true }
    const res = objFilterMutable(o, (value, key) => value === 25 && key === 'a')
    expect(res).toBe(o)
  })

  it('should return an empty object if the input object is empty', () => {
    const result = objFilterMutable({}, (value: Any) => value > 0)
    expect(result).toEqual({})
  })

  it('should return an empty object if no properties passed the test', () => {
    const result = objFilterMutable({ a: 1, b: 2, c: 3 }, (value) => value > 3)
    expect(result).toEqual({})
  })

  it('should use the provided getKeys function if provided', () => {
    const o = { a: 1, b: 2 }
    Object.defineProperty(o, 'c', { value: 2, enumerable: false })
    const res = objFilterMutable(o, (value) => value === 2, Reflect.ownKeys)
    expect(res).toEqual({ b: 2 })
    expect(Reflect.get(o, 'c')).toBe(2)
  })

  it('should call the callback function with the correct arguments', () => {
    const callback = jest.fn().mockReturnValue(true)
    objFilterMutable({ a: 1, b: 2, c: 3 }, callback)
    expect(callback).toHaveBeenCalledWith(1, 'a')
    expect(callback).toHaveBeenCalledWith(2, 'b')
    expect(callback).toHaveBeenCalledWith(3, 'c')
  })
})
