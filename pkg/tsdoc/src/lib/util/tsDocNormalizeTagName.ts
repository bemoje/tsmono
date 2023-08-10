/**
 * Normalizes known tag names to their TypeScript equivalents.
 * If the tag name is not found in the map, it returns the input tag name.
 * @param lc The tag name to normalize.
 * @remarks This function is case-insensitive.
 * @returns The normalized tag name.
 * @example ```ts
 * tsDocNormalizeTagName("TagName");;
 * //=> "tagname"
 * ```
 */
export function tsDocNormalizeTagName(tag: string): string {
  const lc = tag.toLowerCase()
  if (lc === 'virtual') return 'abstract'
  if (lc === 'augments') return 'extends'
  if (lc === 'constructor') return 'class'
  if (lc === 'const') return 'constant'
  if (lc === 'defaultvalue') return 'default'
  if (lc === 'desc') return 'description'
  if (lc === 'host') return 'external'
  if (lc === 'fileoverview') return 'file'
  if (lc === 'fires') return 'emits'
  if (lc === 'func') return 'function'
  if (lc === 'var') return 'member'
  if (lc === 'arg') return 'param'
  if (lc === 'prop') return 'property'
  if (lc === 'return') return 'returns'
  if (lc === 'exception') return 'throws'
  if (lc === 'yield') return 'yields'
  return tag
}
