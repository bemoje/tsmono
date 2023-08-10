/**
 * Checks if the provided tag is a named multi TSDoc tag.
 * Named multi TSDoc tags are 'param' and 'property'.
 * @param tag The tag to check.
 * @returns Returns true if the tag is a named multi TSDoc tag, false otherwise.
 * @example ```ts
 * isNamedMultiTsDocTag('param');;
 * //=> true
 * isNamedMultiTsDocTag('returns');;
 * //=> false
 * ```
 */
export function isNamedMultiTsDocTag(tag: string): boolean {
  return /^(param)$/i.test(tag)
}
