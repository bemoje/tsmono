import { rexec } from './rexec'

/**
 * Returns an array of group names from a regular expression.
 * @param re The regular expression to extract group names from.
 * @returns An array of group names.
 * @example ```ts
 * regexGetGroupNames(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);;
 * //=> ['year', 'month', 'day']
 * ```
 * @remarks This function only works with regular expressions that use named capture groups.
 */
export function regexGetGroupNames(re: RegExp): string[] {
  const names = []
  for (const res of rexec(/\(\?<(?<name>\w+)>/g, re.toString())) {
    names.push(res.groups.name)
  }
  return names
}
