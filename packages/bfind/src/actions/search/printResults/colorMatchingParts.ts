import { colors, regexEscapeString } from '@bemoje/util'

export function colorMatchingParts(filepath: string, keywords: Set<string>): string {
  return [...keywords].reduce((fpath: string, keyword: string) => {
    return fpath.replace(new RegExp(regexEscapeString(keyword), 'gi'), colors.red(keyword))
  }, filepath)
}
