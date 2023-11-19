import { strWrapInDoubleQuotes } from '@bemoje/util'

export function parseCommaDelimitedString(string: string) {
  if (Array.isArray(string)) string = string.join(',')
  return string
    .trim()
    .split(/,| /)
    .map((s) => s.trim())
    .join(',')
}
