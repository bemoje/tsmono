import { getConstructor } from './getConstructor'
import { TConstructorOf } from '../types/TConstructorOf'

describe('getConstructor', () => {
  it('should return the constructor of a given object', () => {
    class TestClass {}
    const instance = new TestClass()
    const constructor: TConstructorOf<TestClass> = getConstructor(instance)
    expect(constructor.name).toBe('TestClass')
  })

  it('should return the constructor of a string', () => {
    expect(getConstructor('hello')).toBe(String)
  })

  it('should return the constructor of a number', () => {
    expect(getConstructor(42)).toBe(Number)
  })

  it('should return the constructor of a boolean', () => {
    expect(getConstructor(true)).toBe(Boolean)
  })

  it('should return the constructor of an object', () => {
    expect(getConstructor({})).toBe(Object)
  })
})
