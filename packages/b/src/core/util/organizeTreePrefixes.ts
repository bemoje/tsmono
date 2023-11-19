export function organizeTreePrefixes(prefixStrings: string[]) {
  prefixStrings.sort()
  const prefixArrays = prefixStrings.map((str) => {
    return str
      .trim()
      .split(' ')
      .map((str) => str.trim())
  })
  const nodePrefixesSet = new Set(
    prefixArrays
      .map((arr) => {
        return arr.map((str, i, arr) => {
          return arr.slice(0, i - 1).join(' ')
        })
      })
      .flat()
      .filter((str) => !!str)
  )
  const nodes = Array.from(nodePrefixesSet).sort((a, b) => a.length - b.length)
  const commands = prefixArrays.map((arr) => arr.join(' ')).filter((str) => !nodePrefixesSet.has(str))
  const root = nodes.shift()
  if (!root) throw new Error('root not found')
  return { root, nodes, commands }
}
