import { rexec } from '@bemoje/node-util'

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
