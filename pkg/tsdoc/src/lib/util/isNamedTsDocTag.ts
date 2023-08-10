/**
 * Checks if the given tag is a named TSDoc tag.
 * @param tag The tag to check.
 * @returns A boolean indicating whether the tag is a named TSDoc tag.
 * @example ```ts
 * isNamedTsDocTag('param');;
 * //=> true
 * isNamedTsDocTag('random');;
 * //=> false
 * ```
 */
export function isNamedTsDocTag(tag: string): boolean {
  return /^(param|property|typedef|alias|event|function|method|namespace|enum|interface|class|type|var|module)$/i.test(
    tag,
  )
}
