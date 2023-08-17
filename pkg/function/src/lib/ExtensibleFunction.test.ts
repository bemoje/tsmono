import { ExtensibleFunction } from './ExtensibleFunction'

describe('ExtensibleFunction', () => {
  it('example', () => {
    class MyFunction<T> extends ExtensibleFunction {
      constructor(f: (...args: any[]) => any) {
        let self: MyFunction<T> | undefined = undefined
        super(f.name, function anonymous(...args: any[]) {
          // do something with self
          return f.call(self, ...args)
        })
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        self = this
      }
    }
    expect(
      new MyFunction(function f(): boolean {
        return true
      }) instanceof MyFunction,
    ).toBe(true)
  })
})
