import { Any, assertThat, isFunction, ObjectKey, TFunctionNoNew } from '@bemoje/util'
import { Base } from '../CommandBuilder/Base'

/**
 * A class that creates an object with methods for disabling/enabling a given method on a given object.
 *
 * @example
 * const md = new MethodDisabler(process.stdout, 'write')
 *
 * md.disable()
 * assert(!md.isEnabled)
 * console.log('This will not print')
 *
 * md.enable()
 * assert(md.isEnabled)
 * console.log('This will print')
 *
 * assert(md.original === process.stdout.write)
 */
export class MethodDisabler extends Base {
  static #defaultDescriptor(value: Any): PropertyDescriptor {
    return { value, writable: true, enumerable: true, configurable: true }
  }
  static #noop: TFunctionNoNew = (...args: any[]) => void 0
  static #memoized = new WeakMap<Record<ObjectKey, Any>, Map<ObjectKey, MethodDisabler>>()

  readonly #obj: Record<ObjectKey, Any>
  readonly #key: string
  readonly #original: TFunctionNoNew
  readonly #hasOwn: boolean
  readonly #originalDescriptor: PropertyDescriptor
  readonly #noopDescriptor: PropertyDescriptor
  #isEnabled = true

  /**
   * @param obj - The object on which the method is defined.
   * @param key - The property name of the method.
   */
  constructor(obj: Record<ObjectKey, Any>, key: string) {
    super()
    assertThat(obj[key], isFunction)
    this.#obj = obj
    this.#key = key
    this.#original = obj[key]
    this.#hasOwn = Object.hasOwn(obj, key)
    this.#originalDescriptor = this.#hasOwn
      ? (Object.getOwnPropertyDescriptor(obj, key) as PropertyDescriptor)
      : MethodDisabler.#defaultDescriptor(this.#original)
    this.#noopDescriptor = Object.assign({}, this.#originalDescriptor, { value: MethodDisabler.#noop })
    // return stored if memoized
    if (MethodDisabler.#memoized.get(obj)?.has(key)) {
      return MethodDisabler.#memoized.get(obj)?.get(key) as this
    }
    //memoize
    if (!MethodDisabler.#memoized.has(obj)) MethodDisabler.#memoized.set(obj, new Map())
    const methods = MethodDisabler.#memoized.get(obj) as Map<ObjectKey, MethodDisabler>
    methods.set(key, this)
  }

  /**
   * Disable the method.
   */
  disable() {
    if (!this.isEnabled) return
    Object.defineProperty(this.#obj, this.#key, this.#noopDescriptor)
    this.#isEnabled = false
  }

  /**
   * Enable the method.
   */
  enable() {
    if (this.isEnabled) return
    if (this.#hasOwn) Object.defineProperty(this.#obj, this.#key, this.#originalDescriptor)
    else delete this.#obj[this.#key]
    this.#isEnabled = true
  }

  /**
   * The original method before it was disabled.
   */
  get original() {
    return this.#original
  }

  /**
   * Whether the method is currently enabled.
   */
  get isEnabled() {
    return this.#isEnabled
  }
}
