/* eslint-disable @typescript-eslint/no-empty-function */
import { safeJsonParse } from './safeJsonParse'
import { safeJsonStringify } from './safeJsonStringify'

describe(safeJsonParse.name, () => {
  it('should parse bigint', () => {
    const json = safeJsonStringify(BigInt(2))
    expect(safeJsonParse(json)).toBe(BigInt(2))
  })

  it('should parse symbol', () => {
    const value = Symbol('info')
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json).toString()).toBe(value.toString())
  })

  it('should parse boolean', () => {
    const json = safeJsonStringify(true)
    expect(safeJsonParse(json)).toBe(true)
  })

  it('should parse date', () => {
    const value = new Date()
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toBeInstanceOf(Date)
  })

  it('should parse map', () => {
    const value = new Map([['a', 1]])
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toBeInstanceOf(Map)
  })

  it('should parse set', () => {
    const value = new Set([1])
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toBeInstanceOf(Set)
  })

  it('should parse object', () => {
    const value = { a: 1 }
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toEqual(value)
  })

  it('should parse array', () => {
    const value = [1]
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toEqual(value)
  })

  it('should parse string', () => {
    const json = safeJsonStringify('abc')
    expect(safeJsonParse(json)).toBe('abc')
  })

  it('should parse undefined', () => {
    const json = safeJsonStringify(undefined)
    expect(safeJsonParse(json)).toBe(undefined)
  })

  it('should parse null', () => {
    const json = safeJsonStringify(null)
    expect(safeJsonParse(json)).toBe(null)
  })

  it('should parse number', () => {
    const json = safeJsonStringify(1)
    expect(safeJsonParse(json)).toBe(1)
  })

  it('should parse NaN', () => {
    const json = safeJsonStringify(NaN)
    expect(safeJsonParse(json)).toBe(NaN)
  })

  it('should parse Infinity', () => {
    const json = safeJsonStringify(Infinity)
    expect(safeJsonParse(json)).toBe(Infinity)
  })

  it('should parse -Infinity', () => {
    const json = safeJsonStringify(-Infinity)
    expect(safeJsonParse(json)).toBe(-Infinity)
  })

  it('should parse function', () => {
    const value = () => {}
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toBe(undefined)
  })

  it('should parse empty string', () => {
    const value = ''
    const json = safeJsonStringify(value)
    expect(safeJsonParse(json)).toBe('')
  })

  it('should parse nested primitives', () => {
    const o = {
      bigint: BigInt(2),
      boolean: true,
      date: new Date(),
      map: new Map([['a', 1]]),
      set: new Set([1, 2]),
      string: 'a',
      symbol: Symbol('description'),
      undef: undefined,
      nil: null,
      number: 1,
      obj: { a: 1 },
      arr: [1, 2],
      nan: NaN,
      infinity: Infinity,
      ninfinity: -Infinity,
      function: () => {},
      emptyString: '',
    }
    const json = safeJsonStringify(o)
    const res = safeJsonParse(json)
    expect(res.bigint).toBe(o.bigint)
    expect(res.boolean).toBe(o.boolean)
    expect(res.date).toBeInstanceOf(Date)
    expect(res.date.toString()).toBe(o.date.toString())
    expect(res.map).toBeInstanceOf(Map)
    expect(res.map).toEqual(o.map)
    expect(res.set).toBeInstanceOf(Set)
    expect(res.set).toEqual(o.set)
    expect(res.string).toBe(o.string)
    expect(res.symbol.toString()).toBe(o.symbol.toString())
    expect(res.undef).toBe(o.undef)
    expect(res.nil).toBe(o.nil)
    expect(res.number).toBe(o.number)
    expect(res.obj).toEqual(o.obj)
    expect(res.arr).toEqual(o.arr)
    expect(res.nan).toBeNaN()
    expect(res.infinity).toBe(Infinity)
    expect(res.ninfinity).toBe(-Infinity)
    expect(res.function).toBe(undefined)
    expect(res.emptyString).toBe('')
  })

  it('should handle circular references', () => {
    const o1 = { p: 2 }
    const o2 = { p: 1, a: [o1] }
    const json = safeJsonStringify({ o1, o2 })
    const res = safeJsonParse(json)
    expect(res.o1).toEqual(o1)
    expect(res.o2.p).toBe(1)
    expect(res.o2.a[0]).toBe('[Circular Reference]')
  })
})
