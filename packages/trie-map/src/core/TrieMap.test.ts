import { TrieMap } from './TrieMap'

describe('TrieMap', () => {
  let trie: TrieMap<any>

  beforeEach(() => {
    trie = new TrieMap()
  })

  it('constructor', () => {
    expect(trie.constructor).toBe(TrieMap)
  })

  it('(static method) fromIterable', () => {
    expect(TrieMap.fromIterable([[['a'], 'value']]).count).toBe(1)
  })

  it('(static method) fromJSON', () => {
    trie.set(['a'], 'value')
    const json = JSON.stringify(trie)
    console.log(json)
    expect(TrieMap.fromJSON(json).count).toBe(1)
  })

  it('(getter) count', () => {
    expect(Object.keys(trie.root).length).toBe(0)
    trie.set(['a'], true)
    expect(Object.keys(trie.root).length).toBe(1)
    trie.set(['b'], true)
    expect(Object.keys(trie.root).length).toBe(2)
  })

  it('(method) clear', () => {
    trie.set(['a'], true)
    trie.set(['b'], true)
    expect(trie.count).toBe(2)
    trie.clear()
    expect(trie.count).toBe(0)
  })

  it('(method) load', () => {
    trie.load([
      [['a'], true],
      [['b'], true],
    ])
    expect(trie.count).toBe(2)
  })

  describe('(methods) set/has/get', () => {
    const testWith = (prefix: string[], value?: any) => {
      expect(trie.has(prefix)).toBe(false)
      trie.set(prefix, value || prefix.join('.'))
      const v = trie.get(prefix)
      if (!v) throw new Error('get did not work.')
      expect(v).toBe(v || prefix.join('.'))
      expect(trie.has(prefix)).toBe(true)
    }

    it('shallow', () => {
      testWith(['a'])
      testWith(['b'])
    })

    it('deep', () => {
      testWith(['a', 'a', 'a'])
      testWith(['a', 'a', 'b'])
      testWith(['a', 'b', 'c'])
      testWith(['c', 'a', 'b'])
    })

    it('overwrite', () => {
      const prefix = ['a']
      let value = 'initial'
      trie.set(prefix, value)
      expect(trie.getStrict(prefix)).toBe(value)
      value = 'new'
      trie.set(prefix, value)
      expect(trie.getStrict(prefix)).toBe(value)
    })

    it('get() allows nonexistent prefix', () => {
      expect(() => {
        trie.get(['a'])
      }).not.toThrowError()
    })
  })

  it('(method) getStrict', () => {
    expect(() => {
      trie.getStrict(['a'])
    }).toThrowError()
  })

  it('(method) update', () => {
    trie.set(['a'], 'value')
    trie.update(['a'], (value) => {
      expect(value).toBe('value')
      return 'new value'
    })
    expect(trie.get(['a'])).toBe('new value')
  })

  describe('(method) delete', () => {
    it('shallow', () => {
      trie.set(['a'], 'value')
      expect(trie.has(['a'])).toBe(true)
      trie.delete(['a'])
      expect(trie.has(['a'])).toBe(false)
    })

    it('only value, not branch', () => {
      trie.set(['a'], 'value')
      trie.set(['a', 'b'], 'value')
      expect(trie.has(['a'])).toBe(true)
      expect(trie.has(['a', 'b'])).toBe(true)
      trie.delete(['a'])
      expect(trie.has(['a'])).toBe(false)
      expect(trie.has(['a', 'b'])).toBe(true)
    })

    it('prune', () => {
      trie.set(['a'], 'value')
      trie.set(['a', 'b'], 'value')
      expect(trie.has(['a'])).toBe(true)
      expect(trie.has(['a', 'b'])).toBe(true)
      trie.delete(['a', 'b'])
      expect(trie.root.a.b).toBe(undefined)
    })

    it('allows nonexistent prefix', () => {
      expect(() => {
        trie.delete(['a'])
      }).not.toThrowError()
    })
  })

  it('(method) deleteStrict', () => {
    expect(() => {
      trie.deleteStrict(['a'])
    }).toThrowError()
  })

  it('(method) forEach', () => {
    const data: Array<any> = [
      [['a'], 'a'],
      [['b'], 'a'],
      [['a', 'a'], 'aa'],
      [['a', 'a', 'a'], 'aaa'],
      [['a', 'b', 'c'], 'abc'],
    ].sort()
    trie.load(data)
    let res: Array<any> = []
    trie.forEach([], (value, prefix) => {
      res.push([prefix, value])
    })
    expect(res.sort()).toStrictEqual(data)
    // cancel recursion
    res = []
    trie.forEach([], (value, prefix) => {
      if (value === 'aa') return true
      res.push([prefix, value])
      return
    })
    expect(res.sort()).toStrictEqual([[['a'], 'a']])
  })

  it('(method) updateAll', () => {
    trie.load([
      [['a'], 0],
      [['b'], 1],
      [['a', 'a'], 2],
    ])
    trie.updateAll([], (value) => value + 1)
    expect(trie.get(['a'])).toBe(1)
    expect(trie.get(['b'])).toBe(2)
    expect(trie.get(['a', 'a'])).toBe(3)
  })

  it('(method) getValues', () => {
    const data: Array<any> = [
      [['a'], 'a'],
      [['b'], 'a'],
      [['a', 'a'], 'aa'],
      [['a', 'a', 'a'], 'aaa'],
      [['a', 'b', 'c'], 'abc'],
    ].sort()
    trie.load(data)
    expect(trie.getValues(['a', 'a'])).toStrictEqual(['aa', 'aaa'])
  })

  it('(method) find', () => {
    trie.load([
      [['a'], true],
      [['b'], false],
      [['a', 'a'], true],
      [['a', 'a', 'a'], false],
      [['a', 'b', 'c'], true],
    ])
    const res: Array<any> = []
    trie.find([], true, (_, prefix) => {
      res.push([prefix])
    })
    expect(res.sort()).toStrictEqual([[['a']], [['a', 'a']], [['a', 'b', 'c']]].sort())
  })

  it('(method) keys', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect([...trie.keys()]).toStrictEqual([['a'], ['b']])
  })

  it('(method) values', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect([...trie.values()]).toStrictEqual([true, false])
  })

  it('(method) entries', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect([...trie.entries()]).toStrictEqual([
      [['a'], true],
      [['b'], false],
    ])
  })

  it('(method) Symbol.iterator', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect([...trie[Symbol.iterator]()]).toStrictEqual([
      [['a'], true],
      [['b'], false],
    ])
  })

  it('(method) toArray', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect(trie.toArray()).toStrictEqual([...trie.entries()])
  })

  it('(method) toJson', () => {
    trie.set(['a'], true)
    trie.set(['b'], false)
    expect(trie.toJson()).toBe(JSON.stringify(trie))
    expect(trie.toJson(true)).toBe(JSON.stringify(trie, null, 2))
  })
})
