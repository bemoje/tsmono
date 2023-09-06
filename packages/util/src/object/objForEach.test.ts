import { objForEach } from './objForEach'

describe('objForEach', () => {
  it('should apply the callback to each key-value pair in the object', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = jest.fn()
    objForEach(object, callback)
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(1, 'a')
    expect(callback).toHaveBeenCalledWith(2, 'b')
    expect(callback).toHaveBeenCalledWith(3, 'c')
  })

  it('should return the original object', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = jest.fn()
    const result = objForEach(object, callback)
    expect(result).toBe(object)
  })

  it('should use the provided getKeys function', () => {
    const object = { a: 1, b: 2, c: 3 }
    const callback = jest.fn()
    const getKeys = jest.fn().mockReturnValue(['a', 'b'])
    objForEach(object, callback, getKeys)
    expect(getKeys).toHaveBeenCalledWith(object)
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(1, 'a')
    expect(callback).toHaveBeenCalledWith(2, 'b')
  })

  it('should handle an empty object', () => {
    const object = {}
    const callback = jest.fn()
    objForEach(object, callback)
    expect(callback).not.toHaveBeenCalled()
  })
})
