/**
 * Checks if the provided code string is a valid TSDoc comment.
 * @remarks This function tests each line of the provided code string against a regular expression that matches the TSDoc comment syntax.
 * @param code The source code string to be checked.
 * @returns A boolean indicating whether the provided code string is a valid TSDoc comment.
 */
export function isValidTsDocComment(code: string): boolean {
  code = code.trim()
  if (!code) return false
  const lines = code.split(/\r?\n/)
  if (lines.length < 2) return false
  const first = lines[0].trim()
  if (first !== '/**') return false
  const last = lines[lines.length - 1].trim()
  if (last !== '*/') return false
  if (lines.length === 2) return true
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i].trimStart()
    if (!line.startsWith('*')) return false
  }
  return true
}
