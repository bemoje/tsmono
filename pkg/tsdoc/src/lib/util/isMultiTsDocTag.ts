/**
 * Checks if the provided tag is a multi TSDoc tag.
 * @remarks This function is case-insensitive.
 * @param tag The tag to check.
 * @returns A boolean indicating whether the tag is a multi TSDoc tag.
 * @example ```ts
 * isMultiTsDocTag('param');;
 * //=> true
 * isMultiTsDocTag('example');;
 * //=> false
 * ```
 */
export function isMultiTsDocTag(tag: string): boolean {
  return /^(param|throws|see|template|typeParam|inheritDoc|link|deprecated)$/i.test(tag)
}
