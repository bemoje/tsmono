/* eslint-disable @typescript-eslint/no-empty-function */
import { isConstructor } from './isConstructor'

describe('isConstructor', () => {
  it('should detect constructor', function () {
    expect(isConstructor(class A {})).toBe(true)
    expect(isConstructor(Array)).toBe(true)
    expect(isConstructor(Function)).toBe(true)
    expect(isConstructor(new Function())).toBe(true)
  })

  it('should NOT detect as constructor', function () {
    expect(isConstructor(undefined)).toBe(false)
    expect(isConstructor(null)).toBe(false)
    expect(isConstructor(1)).toBe(false)
    expect(isConstructor(new Number(1))).toBe(false)
    expect(isConstructor(Array.prototype)).toBe(false)
    expect(isConstructor(Function.prototype)).toBe(false)
  })

  it('should NOT detect bound constructors', function () {
    const clazz = { method() {} }
    clazz.method = clazz.method.bind(clazz)
    expect(isConstructor(clazz.method)).toBe(false)
  })

  it('should return true for a constructor function', () => {
    function Test() {
      //
    }
    expect(isConstructor(Test)).toBe(true)
  })

  it('should return false for a non-constructor function', () => {
    const Test = () => {
      //
    }
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for an object', () => {
    const Test = {}
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for a null value', () => {
    const Test = null
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for an undefined value', () => {
    const Test = undefined
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for a string', () => {
    const Test = 'test'
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for a number', () => {
    const Test = 123
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for a boolean', () => {
    const Test = true
    expect(isConstructor(Test)).toBe(false)
  })

  it('should return false for a function with prototype not being a prototype-object', () => {
    function Test() {
      //
    }
    Test.prototype = {}
    expect(isConstructor(Test)).toBe(false)
  })
})
