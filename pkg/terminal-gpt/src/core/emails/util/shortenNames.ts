import { arrIndicesOf } from '@bemoje/node-util'

export function shortenNames(names: string[]): string[] {
  const firstNames = names.map((name) => name.split(' ')[0])
  return names.map((name) => {
    const split = name.split(' ')
    const first = split[0]
    const occurances = arrIndicesOf(firstNames, first).length
    if (occurances === 1) return first
    return name
  })
}
