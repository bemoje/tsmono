import { TConstructor } from '../util/types/TConstructor'

const counts = new Map<string, number>()

export function countInstance(ctor: TConstructor) {
  const name = ctor.name
  const count = counts.get(name) ?? 0
  counts.set(name, count + 1)
}

export function printCounts() {
  console.log(counts)
}
