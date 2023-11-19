/* eslint-disable @typescript-eslint/no-empty-function */
import { isFunction } from './isFunction'

describe(isFunction.name, () => {
  describe('true', () => {
    it('class constructor', () => {
      expect(isFunction(class {})).toBe(true)
    })

    it('new Function()', () => {
      expect(isFunction(new Function())).toBe(true)
    })

    it('built-in constructors', () => {
      expect(isFunction(Function)).toBe(true)
      expect(isFunction(Array)).toBe(true)
    })

    it('named function', () => {
      expect(isFunction(function () {})).toBe(true)
    })

    it('arrow function', () => {
      expect(isFunction(() => {})).toBe(true)
    })

    it('bound constructors', function () {
      const clazz = { method() {} }
      clazz.method = clazz.method.bind(clazz)
      expect(isFunction(clazz.method)).toBe(true)
    })

    it('function with prototype not being a prototype-object', () => {
      function Test() {}
      Test.prototype = {}
      expect(isFunction(Test)).toBe(true)
    })
  })

  describe('false', () => {
    it('prototype objects', () => {
      expect(isFunction(Function.prototype)).toBe(false)
      expect(isFunction(Array.prototype)).toBe(false)
    })

    it('primitives', () => {
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction(1)).toBe(false)
      expect(isFunction('string')).toBe(false)
      expect(isFunction(false)).toBe(false)
    })
  })
})
