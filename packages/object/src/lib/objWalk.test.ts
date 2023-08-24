import { objWalk } from './objWalk'

describe('objWalk', () => {
  it('should invoke the callback for every non-object value', () => {
    const obj = {
      a: 1,
      b: {
        d: 2,
        e: {
          f: 3,
          g: [3, 4, 5, [6, 7, 8], { h: 9 }],
        },
      },
      c: [1],
    }
    const mockCallback = jest.fn()
    objWalk(obj, mockCallback)
    expect(mockCallback).toHaveBeenCalledTimes(7)
    expect(mockCallback).toHaveBeenCalledWith(1, ['a'])
    expect(mockCallback).toHaveBeenCalledWith(2, ['b', 'd'])
    expect(mockCallback).toHaveBeenCalledWith(3, ['b', 'e', 'f'])
    expect(mockCallback).toHaveBeenCalledWith(6, ['b', 'e', 'g[3]', '0'])
    expect(mockCallback).toHaveBeenCalledWith(7, ['b', 'e', 'g[3]', '1'])
    expect(mockCallback).toHaveBeenCalledWith(8, ['b', 'e', 'g[3]', '2'])
    expect(mockCallback).toHaveBeenCalledWith(9, ['b', 'e', 'g[4]', 'h'])
  })

  it('should handle empty objects and arrays', () => {
    const obj = { a: [], b: {} }
    const mockCallback = jest.fn()
    objWalk(obj, mockCallback)
    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should handle null values', () => {
    const obj = { a: null }
    const mockCallback = jest.fn()
    objWalk(obj, mockCallback)
    expect(mockCallback).toHaveBeenCalledWith(null, ['a'])
  })
})
