import { objFilter } from './objFilter'

describe('objFilter', () => {
  it('should return an empty object if the input object is empty', () => {
    const result = objFilter({}, (value: any) => value > 0)
    expect(result).toEqual({})
  })

  it('should return an object with properties that passed the test', () => {
    const result = objFilter({ a: 1, b: 2, c: 3 }, (value) => value > 1)
    expect(result).toEqual({ b: 2, c: 3 })
  })

  it('should return an empty object if no properties passed the test', () => {
    const result = objFilter({ a: 1, b: 2, c: 3 }, (value) => value > 3)
    expect(result).toEqual({})
  })

  it('should use the provided getKeys function if provided', () => {
    const getKeys = jest.fn().mockReturnValue(['a', 'b'])
    const result = objFilter({ a: 1, b: 2, c: 3 }, (value) => value > 1, getKeys)
    expect(result).toEqual({ b: 2 })
    expect(getKeys).toHaveBeenCalledWith({ a: 1, b: 2, c: 3 })
  })

  it('should call the callback function with the correct arguments', () => {
    const callback = jest.fn().mockReturnValue(true)
    objFilter({ a: 1, b: 2, c: 3 }, callback)
    expect(callback).toHaveBeenCalledWith(1, 'a')
    expect(callback).toHaveBeenCalledWith(2, 'b')
    expect(callback).toHaveBeenCalledWith(3, 'c')
  })
})
