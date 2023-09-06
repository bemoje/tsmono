import { rexec } from '@bemoje/util'

/**
 * Extracts contact information from a given email thread.
 * The function uses a regular expression to match and extract the name and email of each contact in the thread.
 * It ensures that no duplicate contacts are added to the result.
 * @param thread - The email thread from which to extract contacts.
 * @returns An array of tuples, where each tuple contains the name and email of a contact.
 */
export function extractContactsFromEmails(thread: string): [string, string][] {
  const re =
    /(;|:) (?<name>[ A-ÁČĎÉĚÍŇÓŘŠŤÚŮÝŽÆØÅÄÖÜßÑÀÂÇÈÊËÏÎÔŒÙÛŸÌÒŐŰĄĆĘŚŁŃŻŹÃÕĐĹŔĽĞİıŞẠẢẦẤẬẨẪĂẰẮẶẲẴẸẺẼỀẾỆỂỄỊỈĨỌỎỒỐỘỔỖƠỜỚỢỞỠỤỦŨƯỪỨỰỬỮỲỴỶ]+)<(?<email>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/gi
  const seen: Set<string> = new Set()
  const result: [string, string][] = []
  for (const match of rexec(re, thread)) {
    const name = match.groups.name.trim()
    const email = match.groups.email
    if (!seen.has(name + email)) {
      seen.add(name + email)
      result.push([name, email])
    }
  }
  return result
}
