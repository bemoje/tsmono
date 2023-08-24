import { objGet } from './objGet'

describe('objGet', () => {
  it('should return the value for the given key if it exists', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(objGet(obj, 'a')).toBe(1)
    expect(objGet(obj, 'b')).toBe(2)
    expect(objGet(obj, 'c')).toBe(3)
  })

  it('should return undefined if the key does not exist', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(objGet(obj, 'd')).toBeUndefined()
  })

  it('should work with number keys', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'c' }
    expect(objGet(obj, 1)).toBe('a')
    expect(objGet(obj, 2)).toBe('b')
    expect(objGet(obj, 3)).toBe('c')
  })

  it('should work with symbol keys', () => {
    const keyA = Symbol('a')
    const keyB = Symbol('b')
    const obj = { [keyA]: 1, [keyB]: 2 }
    expect(objGet(obj, keyA)).toBe(1)
    expect(objGet(obj, keyB)).toBe(2)
  })

  it('should return undefined if the object is empty', () => {
    const obj = {}
    expect(objGet(obj, 'a')).toBeUndefined()
  })
})
