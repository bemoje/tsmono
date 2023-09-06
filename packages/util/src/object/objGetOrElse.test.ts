import { objGetOrElse } from './objGetOrElse'

describe('objGetOrElse', () => {
  it('should return the value associated with the key if it exists', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const key = 'b'
    const callback = jest.fn()

    const result = objGetOrElse(obj, key, callback)

    expect(result).toBe(2)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the callback function and return its result if the key does not exist', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const key = 'd'
    const callback = jest.fn().mockReturnValue(4)

    const result = objGetOrElse(obj, key, callback)

    expect(result).toBe(4)
    expect(callback).toHaveBeenCalledWith(key)
  })

  it('should add the key-value pair to the object if the key does not exist', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const key = 'd'
    const callback = jest.fn().mockReturnValue(4)

    objGetOrElse(obj, key, callback)

    expect(obj).toHaveProperty(key, 4)
  })

  it('should handle symbol keys', () => {
    const key = Symbol('key')
    const obj = { [key]: 'value' }
    const callback = jest.fn()

    const result = objGetOrElse(obj, key, callback)

    expect(result).toBe('value')
    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle number keys', () => {
    const obj = { 1: 'one', 2: 'two', 3: 'three' }
    const key = 2
    const callback = jest.fn()

    const result = objGetOrElse(obj, key, callback)

    expect(result).toBe('two')
    expect(callback).not.toHaveBeenCalled()
  })
})
