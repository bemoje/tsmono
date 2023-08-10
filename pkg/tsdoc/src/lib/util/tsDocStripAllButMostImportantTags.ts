import { TsDoc } from '../TsDoc'
import { tsDocExtractAllComments } from './tsDocExtractAllComments'

/**
 * This function takes a source string, extracts all TSDoc comments from it, and then strips all TSDoc tags from these comments except for the 'throws' and 'param' tags.
 * The function then returns the modified source string.
 * @remarks This function is useful when you want to simplify your TSDoc comments by removing all tags except for the 'throws' and 'param' tags.
 * @param source - The source string from which TSDoc comments are to be extracted and modified.
 * @returns The modified source string with all TSDoc tags stripped except for the 'throws' and 'param' tags.
 * @throws If the source string is not a valid TSDoc comment.
 * @example ```ts
 * const source = `
 * /**
 *  * Adds two numbers.
 *  * @param a - The first number.
 *  * @param b - The second number.
 *  * @returns The sum of a and b.
 *  * @throws If a or b is not a number.
 *  *\/
 * `;
 * tsDocStripAllTagsExcepThrowsParamDescription(source);
 * //=> removes the returns-tag.
 * ```
 */
export function tsDocStripAllButMostImportantTags(source: string): string {
  let result = source + ''
  for (const { match } of tsDocExtractAllComments(source)) {
    const tsdoc = new TsDoc(match)
    const description = tsdoc.single.get('description')
    const params = tsdoc.namedMulti.get('param')
    const thro = tsdoc.multi.get('throws')
    tsdoc.clear()
    if (description) tsdoc.single.set('description', description)
    if (params) tsdoc.namedMulti.set('param', params)
    if (thro) tsdoc.multi.set('throws', thro)
    result = result?.replace(match, tsdoc.render())
  }
  return result
}
