import { arrIndicesOf } from '@bemoje/array'

/**
 * This function shortens a list of names by removing the last names,
 * but only if the first name is unique in the list. If the first name
 * is not unique, the full name is returned.
 * @param names - An array of full names (first and last name)
 * @returns An array of names where each name is either a first name (if unique) or a full name
 */
export function shortenNames(names: string[]): string[] {
  const firstNames = names.map((name) => name.split(' ')[0])
  return names.map((name) => {
    const first = name.split(' ')[0]
    const occurances = arrIndicesOf(firstNames, first).length
    return occurances === 1 ? first : name
  })
}
