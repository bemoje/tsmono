import { Any } from '@bemoje/util'

export function createObjectMerger(predicate: (value: Any, key: string, obj: Record<string, Any>) => boolean) {
  return function objMerge(target: Record<string, Any>, ...sources: Record<string, Any>[]) {
    for (const src of sources) {
      for (const [key, value] of Object.entries(src)) {
        if (predicate(value, key, src)) {
          target[key] = value
        }
      }
    }
    return target
  }
}
