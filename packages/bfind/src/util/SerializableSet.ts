export class SerializableSet<T> extends Set<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    super(...args)
  }
  toJSON() {
    return [...this]
  }
}
