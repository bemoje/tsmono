import assert from 'assert'
import type { Any, ObjectKey } from '@bemoje/util'
import { MethodDisabler } from './MethodDisabler'

describe(MethodDisabler.name, () => {
  it('TSDOC @example', () => {
    expect(() => {
      const md = new MethodDisabler(process.stdout, 'write')

      md.disable()
      assert(!md.isEnabled)
      console.log('This will not print')

      md.enable()
      assert(md.isEnabled)
      // console.log('This will print')

      assert(md.original === process.stdout.write)
    }).not.toThrow()
  })

  describe('constructor', () => {
    it('instanceof ' + MethodDisabler.name, () => {
      expect(new MethodDisabler(Array.prototype, 'sort')).toBeInstanceOf(MethodDisabler)
    })

    it('throws if not function', () => {
      expect(() => new MethodDisabler(Array.prototype, 'length')).toThrow()
    })

    it('original', () => {
      expect(new MethodDisabler(Array.prototype, 'sort').original).toBe(Array.prototype['sort'])
    })

    it('memoize', () => {
      const ins = new MethodDisabler(Map.prototype, 'set')
      expect(ins).toBe(new MethodDisabler(Map.prototype, 'set'))
      expect(ins).not.toBe(new MethodDisabler(Map.prototype, 'get'))
      expect(ins).not.toBe(new MethodDisabler(WeakMap.prototype, 'set'))
    })
  })

  type Obj = Record<ObjectKey, Any>
  type BfOpts = { obj: Obj; key: string }
  type Opts = { ins: MethodDisabler; obj: Obj; key: string; spy?: jest.SpyInstance }

  const createMock = (opts: BfOpts) => {
    const { obj, key } = opts
    jest.clearAllMocks()
    const spy = jest.spyOn(obj, key)
    spy.mockImplementation(() => false)
    return spy
  }

  const createInstance = (opts: BfOpts) => {
    const { obj, key } = opts
    jest.clearAllMocks()
    return new MethodDisabler(obj, key)
  }

  const testIsEnabled = (opts: Opts) => () => {
    const { ins, obj, key, spy } = opts
    expect(ins.isEnabled).toBe(true)
    obj[key]('')
    if (spy) expect(spy).toHaveBeenCalledTimes(1)
  }

  const testDisable = (opts: Opts) => () => {
    const { ins, obj, key, spy } = opts
    ins.disable()
    expect(obj[key]).not.toBe(ins.original)
    expect(ins.isEnabled).toBe(false)
    obj[key]('')
    if (spy) expect(spy).not.toHaveBeenCalled()
  }

  const testEnable = (opts: Opts) => () => {
    const { ins, obj, key, spy } = opts
    ins.disable()
    ins.enable()
    expect(obj[key]).toBe(ins.original)
    if (spy) createMock({ obj, key })
    testIsEnabled(opts)
  }

  const runTest = (opts: Opts) => {
    const bopts = { obj: opts.obj, key: opts.key }
    beforeEach(() => {
      opts.ins = createInstance(bopts)
      if (opts.spy) opts.spy = createMock(bopts)
    })
    it('isEnabled', testIsEnabled(opts))
    it('disable', testDisable(opts))
    it('enable', testEnable(opts))
  }

  describe('console.log (hasOwn)', () => {
    const bopts = { obj: console, key: 'log' }
    runTest({ ...bopts, ins: createInstance(bopts), spy: createMock(bopts) })
  })

  describe('process.stdout.write', () => {
    const bopts = { obj: process.stdout, key: 'write' }
    runTest({ ...bopts, ins: createInstance(bopts), spy: createMock(bopts) })
  })

  describe('[].push ', () => {
    const bopts = { obj: [], key: 'join' }
    runTest({ ...bopts, ins: createInstance(bopts) })
  })
})
