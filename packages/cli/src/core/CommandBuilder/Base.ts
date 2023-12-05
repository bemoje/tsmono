export class Base {
  static nextIndex: Record<string, number> = {}
  id: number
  constructor() {
    this.id = Base.nextIndex[this.constructor.name] = 1 + (Base.nextIndex[this.constructor.name] ?? 0)
  }
}
