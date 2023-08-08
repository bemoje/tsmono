export class SerializableSet<T> extends Set<T> {
  constructor(...args: any[]) {
    super(...args)
  }
  toJSON() {
    return Array.from(this)
  }
}
