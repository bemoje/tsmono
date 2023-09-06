import { iteratePrototypeChain } from './iteratePrototypeChain'

describe('iteratePrototypeChain', () => {
  class A {}
  class B extends A {}
  class C extends B {}
  const instance = new C()
  it('iterates prototype chain for class constructor', () => {
    expect([...iteratePrototypeChain(C)]).toStrictEqual([C, B, A, Function.prototype, Object.prototype])
  })
  it('iterates prototype chain for class prototype', () => {
    expect([...iteratePrototypeChain(C.prototype)]).toStrictEqual([
      C.prototype,
      B.prototype,
      A.prototype,
      Object.prototype,
    ])
  })
  it('iterates prototype chain for class instance', () => {
    expect([...iteratePrototypeChain(instance)]).toStrictEqual([
      instance,
      C.prototype,
      B.prototype,
      A.prototype,
      Object.prototype,
    ])
  })

  it('should return a generator that yields the object and its prototype chain', () => {
    class A {}
    class B extends A {}
    const b = new B()

    const gen = iteratePrototypeChain(b)

    expect(gen.next().value).toBe(b)
    expect(gen.next().value).toBe(B.prototype)
    expect(gen.next().value).toBe(A.prototype)
    expect(gen.next().value).toBe(Object.prototype)
    expect(gen.next().done).toBe(true)
  })

  it('should return a generator that yields the prototype object and its prototype chain', () => {
    class A {}
    const aProto = A.prototype

    const gen = iteratePrototypeChain(aProto)

    expect(gen.next().value).toBe(aProto)
    expect(gen.next().value).toBe(Object.prototype)
    expect(gen.next().done).toBe(true)
  })
})
