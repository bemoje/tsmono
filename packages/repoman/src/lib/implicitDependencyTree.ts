import { TrieMap } from '@bemoje/trie-map'
import { implicitDependencies } from './implicitDependencies'
import { implicitDependentsRecursive } from './implicitDependentsRecursive'

export function implicitDependencyTree(packageName: string): string {
  const trie = new TrieMap<string>()
  function recurse(name: string, p: string[]) {
    for (const dep of implicitDependencies(name)) {
      if (!p.includes(dep)) {
        p.push(dep)
        recurse(dep, p.slice())
        p.pop()
      }
      if (dep === packageName) {
        console.error(`Circular dependency detected: ${p.join(' -> ')}`)
      }
      trie.set(p.concat(dep), '')
    }
  }

  recurse(packageName, implicitDependentsRecursive(packageName).concat(packageName))

  const json = trie.toJson().replace(/,?"\\u0000":""/g, '')
  return JSON.stringify(JSON.parse(json), null, 4)
    .replace(/[":{},]/g, ' ')
    .replace(/^ {9}/gm, '')
    .split('\n')
    .filter((s) => !!s.trim())
    .join('\n')
    .trim()
    .replace('root', '')
    .trim()
}
