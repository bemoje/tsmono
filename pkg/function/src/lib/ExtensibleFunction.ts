/**
 * A Function class that can be extended.
 * @example
 * ```ts
 * class MyFunction<T> extends util.ExtensibleFunction {
 *   constructor(f: (...args: any[]) => any) {
 *     let self: MyFunction<T> | undefined = undefined;
 *     super(f.name, function anonymous(...args: any[]) {
 *       // do something with self
 *       return f.call(self, ...args);
 *     });
 *     self = this;
 *   }
 * }
 * ```
 */
export class ExtensibleFunction extends Function {
  constructor(name: string, f: (...args: any[]) => any) {
    Object.defineProperty(f, 'name', { value: name })
    super(typeof f === 'string' ? f : f.toString())
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
