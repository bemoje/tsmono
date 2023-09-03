/* eslint-disable @typescript-eslint/no-explicit-any */

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
export class ExtensibleFunction<F extends (...args: any[]) => any = (...args: any[]) => any> extends Function {
  constructor(name: string, f: (this: any, ...args: Parameters<F>) => ReturnType<F>) {
    Object.defineProperty(f, 'name', { value: name })
    super(typeof f === 'string' ? f : f.toString())
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}
