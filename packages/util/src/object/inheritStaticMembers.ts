import type { TConstructor } from '../types/TConstructor'

/**
 * Copies static members from a source constructor to a target constructor, excluding specified keys.
 * @param target The target constructor to inherit static members.
 * @param source The source constructor to copy static members from.
 * @param ignoreKeys An optional array of keys to exclude from copying.
 * @returns The target constructor with the inherited static members.
 * @throws If `target` or `source` is not a constructor.
 * @param - The keys that should not be inherited.
 * @example ```ts
 * class Parent {
 *   static parentStaticMethod() {
 *     return 'Parent static method'
 *   }
 * }
 * class Child {
 *   static childStaticMethod() {
 *     return 'Child static method'
 *   }
 * }
 * inheritStaticMembers(Child, Parent)
 * Child.parentStaticMethod() //=> 'Parent static method'
 * ```
 */
export function inheritStaticMembers(
  target: TConstructor,
  source: TConstructor,
  ignoreKeys: string[] = []
): TConstructor {
  const ignore: Set<string | symbol> = new Set([...ignoreKeys, 'prototype', 'name', 'constructor'])
  for (const key of Reflect.ownKeys(source)) {
    if (ignore.has(key)) continue
    if (Reflect.has(target, key)) continue
    const des = Object.getOwnPropertyDescriptor(source, key)
    Object.defineProperty(target, key, des as PropertyDescriptor)
  }
  return target
}
