import { Any, assertThat, isFunction, ObjectKey, TFunction } from '@bemoje/util'

export class MethodDisabler {
  static #memoized = new WeakMap<Record<ObjectKey, Any>, Map<ObjectKey, MethodDisabler>>()

  readonly #obj: Record<ObjectKey, Any>
  readonly #key: string
  readonly #original: TFunction
  readonly #createDescriptor: (method: TFunction) => PropertyDescriptor

  constructor(obj: Record<ObjectKey, Any>, key: string) {
    this.#obj = obj
    this.#key = key
    this.#createDescriptor = this.getDescriptorCreator(obj, key)
    this.#original = obj[key]

    // return stored if memoized
    if (MethodDisabler.#memoized.get(obj)?.has(key)) {
      return MethodDisabler.#memoized.get(obj)?.get(key) as this
    }

    assertThat(this.#original, isFunction)

    //memoize
    if (!MethodDisabler.#memoized.has(obj)) MethodDisabler.#memoized.set(obj, new Map())
    const methods = MethodDisabler.#memoized.get(obj) as Map<ObjectKey, MethodDisabler>
    methods.set(key, this)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disable(replaceWith: TFunction = () => {}) {
    Object.defineProperty(this.#obj, this.#key, this.#createDescriptor(replaceWith))
  }

  enable() {
    if (this.#obj[this.#key] === this.#original) return
    Object.defineProperty(this.#obj, this.#key, this.#createDescriptor(this.#original))
  }

  isEnabled() {
    return this.#obj[this.#key] !== this.#original
  }

  getOriginal() {
    return this.#original
  }

  private getDescriptorCreator(obj: Record<ObjectKey, Any>, key: string): (method: TFunction) => PropertyDescriptor {
    const des = Object.getOwnPropertyDescriptor(obj, key) || {
      value: undefined,
      writable: true,
      enumerable: true,
      configurable: true,
    }
    return (method: TFunction) => Object.assign({}, des, { value: method }) as PropertyDescriptor
  }
}

//////////////////
//////////////////

console.log(Reflect.ownKeys(console))

const _stdout = new MethodDisabler(process.stdout, 'write')
const _stderr = new MethodDisabler(process.stderr, 'write')

const print = () => {
  console.log('log msg')
  console.info('info msg')
  console.warn('warn msg')
  console.error('error msg')

  _stdout.enable()
  _stderr.enable()
  console.log('-------')
}

console.log('-------')

print()
_stdout.disable()
print()
_stderr.disable()
print()

/**
 *
 */
// export function createMethodDisabler(obj: Record<ObjectKey, Any>, key: string): MethodDisabler {
//   // return stored if MethodDisabler.memoized
//   if (memoized.get(obj)?.has(key)) {
//     return memoized.get(obj)?.get(key) as MethodDisabler
//   }

//   const method = obj[key]
//   assertThat(method, isFunction)
//   const descriptor = getDescriptorCreator(obj, key)

//   const result = {
//     disable: function (replaceWith: TFunction = noop) {
//       Object.defineProperty(obj, key, descriptor(replaceWith))
//     },
//     enable: function () {
//       if (obj[key] === method) return
//       Object.defineProperty(obj, key, descriptor(method))
//     },
//     isEnabled: function () {
//       return obj[key] !== method
//     },
//     getMethod() {
//       return method
//     },
//   }

//   // memoize
//   if (!memoized.has(obj)) memoized.set(obj, new Map())
//   const methods = memoized.get(obj) as TMethods
//   methods.set(key, result)

//   return result
// }

// export interface MethodDisabler {
//   disable: () => void
//   enable: () => void
//   isEnabled: () => boolean
//   getMethod: () => TFunction
// }

////////

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function setProp(obj: Record<ObjectKey, any>, key: string, value: unknown) {
//   const descriptor = Object.getOwnPropertyDescriptor(obj, key) ?? createDescriptor(value)
//   descriptor.value = value

//   Object.defineProperty(obj, key, {
//     value: value,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

////////

// const stdoutWrite = process.stdout.write.bind(process.stdout)

// export function stdoutEnable() {
//   if (stdoutIsEnabled()) return
//   setProp(process.stdout, 'write', stdoutWrite)
// }

// export function stdoutDisable() {
//   setProp(process.stdout, 'write', noop)
// }

// export function stdoutIsEnabled() {
//   return process.stdout.write !== noop
// }

// ////////

// const stderrWrite = process.stderr.write.bind(process.stderr)

// export function stderrEnable() {
//   if (stderrIsEnabled()) return
//   setProp(process.stderr, 'write', stderrWrite)
// }

// export function stderrDisable() {
//   setProp(process.stderr, 'write', noop)
// }

// export function stderrIsEnabled() {
//   return process.stderr.write !== noop
// }

// ////////

// ////////

// const consoleDir = console.dir.bind(console)

// export function consoleDirEnable() {
//   if (consoleDirIsEnabled()) return
//   Object.defineProperty(console, 'dir', {
//     value: consoleDir,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleDirDisable() {
//   Object.defineProperty(console, 'dir', {
//     value: noop,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleDirIsEnabled() {
//   return console.dir !== noop
// }

// ////////

// const consoleWarn = console.warn.bind(console)

// export function consoleWarnEnable() {
//   if (consoleWarnIsEnabled()) return
//   Object.defineProperty(console, 'warn', {
//     value: consoleWarn,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleWarnDisable() {
//   Object.defineProperty(console, 'warn', {
//     value: noop,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleWarnIsEnabled() {
//   return console.warn !== noop
// }

// ////////

// const consoleError = console.error.bind(console)

// export function consoleErrorEnable() {
//   if (consoleErrorIsEnabled()) return
//   Object.defineProperty(console, 'error', {
//     value: consoleError,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleErrorDisable() {
//   Object.defineProperty(console, 'error', {
//     value: noop,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleErrorIsEnabled() {
//   return console.error !== noop
// }

// ////////

// const consoleInfo = console.info.bind(console)

// export function consoleInfoEnable() {
//   if (consoleInfoIsEnabled()) return
//   Object.defineProperty(console, 'info', {
//     value: consoleInfo,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleInfoDisable() {
//   Object.defineProperty(console, 'info', {
//     value: noop,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleInfoIsEnabled() {
//   return console.info !== noop
// }

// ////////

// const consoleDebug = console.debug.bind(console)

// export function consoleDebugEnable() {
//   if (consoleDebugIsEnabled()) return
//   Object.defineProperty(console, 'debug', {
//     value: consoleDebug,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleDebugDisable() {
//   Object.defineProperty(console, 'debug', {
//     value: noop,
//     writable: true,
//     enumerable: true,
//     configurable: true,
//   })
// }

// export function consoleDebugIsEnabled() {
//   return console.debug !== noop
// }

////////

////////

// const originalLog = console.log.bind(console)

// Object.defineProperty(console, 'log', {
//   value: (chunk: any) => {
//     // you can format the output here
//     const formattedChunk = `log: ${chunk}`
//     originalLog(formattedChunk)
//   },
// })

// const consoleLog = console.log
// Object.defineProperty(console, 'log', {
//   value: function log(...args: Any[]) {
// consoleLog.call(this, 'INFO:')
// consoleLog.call(this, ...args)
//   },
// })
