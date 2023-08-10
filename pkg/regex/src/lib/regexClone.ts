/**
 * Clones a regular expression.
 * @remarks This function creates a new instance of the RegExp using the source and flags of the provided regular expression.
 * @param regex The regular expression to clone.
 * @returns A new RegExp instance with the same source and flags as the provided regular expression.
 * @example ```ts
 * /abc/gi;;
 * //=> /abc/gi
 * regexClone(/abc/gi);;
 * //=> /abc/gi
 * ```
 */
export function regexClone(regex: RegExp): RegExp {
  return new RegExp(regex.source, regex.flags)
}
