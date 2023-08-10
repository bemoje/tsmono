import { TsDoc } from '../TsDoc'
import { tsDocExtractAllComments } from './tsDocExtractAllComments'

/**
 * This function takes a source string, extracts all TSDoc comments from it, and then strips all example TSDoc tags from these comments.
 * @param source - The source string from which TSDoc comments are to be extracted and modified.
 * @returns The modified source string with all example TSDoc tags stripped.
 */
export function tsDocStripExample(source: string): string {
  let result = source + ''
  for (const { match } of tsDocExtractAllComments(source)) {
    const tsdoc = new TsDoc(match)
    tsdoc.removeTags('example')
    result = result?.replace(match, tsdoc.render())
  }
  return result
}
