import { getImportedCategorized } from './getImportedCategorized'
import { getPackages } from './getPackages'

export function getImportedCategorizedForEach(): Record<string, Record<string, string[]>> {
  const result: Record<string, Record<string, string[]>> = {}
  getPackages().forEach(({ name, rootdir }) => {
    result[name] = getImportedCategorized(rootdir)
  })
  return result
}
