import { mapGetOrElse } from './mapGetOrElse'

describe('mapGetOrElse', () => {
  it('should return the value for the key if it exists in the map', () => {
    const map = new Map<string, number>()
    map.set('test', 1)
    const callback = jest.fn()

    const result = mapGetOrElse(map, 'test', callback)

    expect(result).toBe(1)
    expect(callback).not.toHaveBeenCalled()
  })

  it('should call the callback and set the value in the map if the key does not exist', () => {
    const map = new Map<string, number>()
    const callback = jest.fn().mockReturnValue(2)

    const result = mapGetOrElse(map, 'test', callback)

    expect(result).toBe(2)
    expect(callback).toHaveBeenCalledWith('test')
    expect(map.get('test')).toBe(2)
  })

  it('should handle edge case where map is empty', () => {
    const map = new Map<string, number>()
    const callback = jest.fn().mockReturnValue(3)

    const result = mapGetOrElse(map, 'test', callback)

    expect(result).toBe(3)
    expect(callback).toHaveBeenCalledWith('test')
    expect(map.get('test')).toBe(3)
  })

  it('should handle edge case where callback returns undefined', () => {
    const map = new Map<string, number>()
    const callback = jest.fn().mockReturnValue(undefined)

    const result = mapGetOrElse(map, 'test', callback)

    expect(result).toBeUndefined()
    expect(callback).toHaveBeenCalledWith('test')
    expect(map.get('test')).toBeUndefined()
  })
})
