import { Any } from '@bemoje/util'

export function objDestroy(obj: Record<string | symbol, Any>) {
  for (const key of Reflect.ownKeys(obj)) {
    Reflect.deleteProperty(obj, key)
  }
}
