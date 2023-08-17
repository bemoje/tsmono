/**
 * Checks if a given string is numeric.
 * @remarks This function will return true if the string can be converted to a finite number, false otherwise.
 * @param string The string to be checked.
 * @returns A boolean indicating whether the string is numeric or not.
 * @example ```ts
 * isNumericString("123");;
 * //=> true
 * isNumericString("abc");;
 * //=> false
 * ```
 */
export function isNumericString(string: string): boolean {
  const trim = string.trim()
  if (!trim) return false
  const n = Number(trim)
  return !isNaN(n) && isFinite(n)
}
