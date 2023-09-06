import { getImported } from './getImported'

const builtins = new Set(require('module').builtinModules)

export function getImportedCategorized(pkgroot: string): Record<string, string[]> {
  const { imports, typeImports } = getImported(pkgroot)
  const result: Record<string, string[]> = {}
  const add = (category: string, type: string, imp: string) => {
    if (!result[category + '_' + type]) result[category + '_' + type] = []
    result[category + '_' + type].push(imp)
  }
  for (const imp of imports) {
    if (imp.startsWith('.')) {
      continue
    } else if (imp.startsWith('@bemoje/')) {
      add('implicit', 'imports', imp)
    } else if (builtins.has(imp)) {
      add('builtin', 'imports', imp)
    } else {
      add('external', 'imports', imp)
    }
  }
  for (const imp of typeImports) {
    if (imp.startsWith('.')) {
      continue
    } else if (imp.startsWith('@bemoje/')) {
      add('implicit', 'typeImports', imp)
    } else if (builtins.has(imp)) {
      add('builtin', 'typeImports', imp)
    } else {
      add('external', 'typeImports', imp)
    }
  }
  return result
}
