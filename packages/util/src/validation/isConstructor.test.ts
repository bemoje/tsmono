/* eslint-disable @typescript-eslint/no-empty-function */
import { isConstructor } from './isConstructor'

describe('isConstructor', () => {
  describe('true', () => {
    it('class constructor', () => {
      expect(isConstructor(class {})).toBe(true)
    })

    it('new Function()', () => {
      expect(isConstructor(new Function())).toBe(true)
    })

    it('built-in constructors', () => {
      expect(isConstructor(Function)).toBe(true)
      expect(isConstructor(Array)).toBe(true)
    })

    it('named function', () => {
      expect(isConstructor(function () {})).toBe(true)
    })
  })

  describe('false', () => {
    it('arrow function', () => {
      expect(isConstructor(() => {})).toBe(false)
    })

    it('prototype objects', () => {
      expect(isConstructor(Function.prototype)).toBe(false)
      expect(isConstructor(Array.prototype)).toBe(false)
    })

    it('bound constructors', function () {
      const clazz = { method() {} }
      clazz.method = clazz.method.bind(clazz)
      expect(isConstructor(clazz.method)).toBe(false)
    })

    it('function with prototype not being a prototype-object', () => {
      function Test() {
        //
      }
      Test.prototype = {}
      expect(isConstructor(Test)).toBe(false)
    })

    it('primitives', () => {
      expect(isConstructor(null)).toBe(false)
      expect(isConstructor(undefined)).toBe(false)
      expect(isConstructor(1)).toBe(false)
      expect(isConstructor('string')).toBe(false)
      expect(isConstructor(false)).toBe(false)
    })
  })
})
