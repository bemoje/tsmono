import { Any } from '@bemoje/util'

export class SerializableSet<T> extends Set<T> {
  constructor(...args: Any[]) {
    super(...args)
  }
  toJSON() {
    return [...this]
  }
}
