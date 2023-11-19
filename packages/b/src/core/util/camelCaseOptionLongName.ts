/**
 * Camel case an Option's 'attributeName'.
 */
export function camelCaseOptionLongName(string: string) {
  return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
