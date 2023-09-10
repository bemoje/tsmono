/* eslint-disable @typescript-eslint/no-empty-function */
import { safeJsonParse } from './safeJsonParse'
import { safeJsonStringify } from './safeJsonStringify'

describe(safeJsonStringify.name + ' and ' + safeJsonParse.name, () => {
  it('should serialize bigint', () => {
    const json = safeJsonStringify(BigInt(2))
    expect(json).toBe('["\\u0003","BigInt:2"]')
  })

  it('should serialize symbol', () => {
    const value = Symbol('info')
    const json = safeJsonStringify(value)
    expect(json).toBe('["\\u0003","Symbol:info"]')
  })

  it('should serialize boolean', () => {
    const json = safeJsonStringify(true)
    expect(json).toBe('["\\u0003",true]')
  })

  it('should serialize date', () => {
    const value = new Date()
    const json = safeJsonStringify(value)
    expect(json).toBe('"' + value.toISOString() + '"')
  })

  it('should serialize map', () => {
    const value = new Map([['a', 1]])
    const json = safeJsonStringify(value)
    expect(json).toBe('["\\u0002",[["a",1]]]')
  })

  it('should serialize set', () => {
    const value = new Set([1])
    const json = safeJsonStringify(value)
    expect(json).toBe('["\\u0001",[1]]')
  })

  it('should serialize object', () => {
    const value = { a: 1 }
    const json = safeJsonStringify(value)
    expect(json).toBe('{"a":1}')
  })

  it('should serialize array', () => {
    const value = [1]
    const json = safeJsonStringify(value)
    expect(json).toBe('[1]')
  })

  it('should serialize string', () => {
    const json = safeJsonStringify('abc')
    expect(json).toBe('["\\u0003","abc"]')
  })

  it('should serialize undefined', () => {
    const json = safeJsonStringify(undefined)
    expect(json).toBe('["\\u0003","undefined"]')
  })

  it('should serialize null', () => {
    const json = safeJsonStringify(null)
    expect(json).toBe('["\\u0003",null]')
  })

  it('should serialize number', () => {
    const json = safeJsonStringify(1)
    expect(json).toBe('["\\u0003",1]')
  })

  it('should serialize NaN', () => {
    const json = safeJsonStringify(NaN)
    expect(json).toBe('["\\u0003","NaN"]')
  })

  it('should serialize Infinity', () => {
    const json = safeJsonStringify(Infinity)
    expect(json).toBe('["\\u0003","Infinity"]')
  })

  it('should serialize -Infinity', () => {
    const json = safeJsonStringify(-Infinity)
    expect(json).toBe('["\\u0003","-Infinity"]')
  })

  it('should serialize function', () => {
    const value = () => {}
    const json = safeJsonStringify(value)
    expect(json).toBe('["\\u0003","undefined"]')
  })

  it('should serialize empty string', () => {
    const value = ''
    const json = safeJsonStringify(value)
    expect(json).toBe('["\\u0003",""]')
  })
})
