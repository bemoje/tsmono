import { mapUpdate } from './mapUpdate'

describe('mapUpdate', () => {
  it('should update the value for the given key in the map', () => {
    const map = new Map<string, number>()
    map.set('key1', 1)
    const fun = (value: number | undefined, key: string) => (value ? value + 1 : 1)
    const result = mapUpdate(map, 'key1', fun)
    expect(result).toBe(2)
    expect(map.get('key1')).toBe(2)
  })

  it('should call the function with undefined as the value if the key does not exist', () => {
    const map = new Map<string, number>()
    const fun = jest.fn((value: number | undefined, key: string) => (value ? value + 1 : 1))
    mapUpdate(map, 'key1', fun)
    expect(fun).toHaveBeenCalledWith(undefined, 'key1')
  })

  it('should add the key to the map if it does not exist', () => {
    const map = new Map<string, number>()
    const fun = (value: number | undefined, key: string) => (value ? value + 1 : 1)
    mapUpdate(map, 'key1', fun)
    expect(map.has('key1')).toBe(true)
  })

  it('should return the new value for the key', () => {
    const map = new Map<string, number>()
    const fun = (value: number | undefined, key: string) => (value ? value + 1 : 1)
    const result = mapUpdate(map, 'key1', fun)
    expect(result).toBe(1)
  })
})
