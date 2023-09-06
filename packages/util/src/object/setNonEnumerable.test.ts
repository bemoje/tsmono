import { setNonEnumerable } from './setNonEnumerable'

describe(setNonEnumerable.name, () => {
  it('should set the enumerable property to true.', () => {
    const o = { a: 1 }
    expect(Object.keys(o).includes('a')).toBe(true)
    setNonEnumerable(o, 'a')
    expect(Object.keys(o).includes('a')).toBe(false)
  })

  describe('when a property does not exist on the object', () => {
    const object = {
      prop1: 'value1',
    }

    it('should throw an error when one property does not exist', () => {
      expect(() => setNonEnumerable(object, 'prop2')).toThrow("Property, 'prop2' does not exist on object.")
    })

    it('should throw an error when multiple properties do not exist', () => {
      expect(() => setNonEnumerable(object, 'prop2', 'prop3')).toThrow("Property, 'prop2' does not exist on object.")
    })
  })

  describe('when a property does not have a descriptor', () => {
    Object.defineProperty(Object.prototype, 'inheritedProp', {
      value: 'value2',
      writable: true,
      configurable: true,
      enumerable: true,
    })
    const object = {
      prop1: 'value1',
    }

    it('should throw an error when a property does not have a descriptor', () => {
      expect(() => setNonEnumerable(object, 'inheritedProp')).toThrow()
    })

    it('should throw an error when multiple properties do not have a descriptor', () => {
      expect(() => setNonEnumerable(object, 'inheritedProp', 'prop2')).toThrow()
    })
  })

  describe('when all properties exist and have descriptors', () => {
    const object = {
      prop1: 'value1',
      prop2: 'value2',
    }

    it('should make a single property non-enumerable', () => {
      setNonEnumerable(object, 'prop1')
      expect(Object.getOwnPropertyDescriptor(object, 'prop1')?.enumerable).toBe(false)
      expect(Object.getOwnPropertyDescriptor(object, 'prop2')?.enumerable).toBe(true)
    })

    it('should make multiple properties non-enumerable', () => {
      setNonEnumerable(object, 'prop1', 'prop2')
      expect(Object.getOwnPropertyDescriptor(object, 'prop1')?.enumerable).toBe(false)
      expect(Object.getOwnPropertyDescriptor(object, 'prop2')?.enumerable).toBe(false)
    })
  })
})
