export function splitEmails(text: string) {
  const lines = text
    .substring(0, text.indexOf('\n\n\n--\n\n\n'))
    .replace(/\r*\n/g, '\n')
    .replace(/( ?\n ?){3,}/g, '\n\n')
    .split(/\r*\n/)

  const emails = []
  let temp = []
  let isSignature = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (temp.length > 4 && /<[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>/i.test(line)) {
      emails.push(temp.join('\n').trim())
      temp = []
      isSignature = false
    }
    if (/ \/ /.test(line) && /venlig|hilsen|regards/i.test(line)) {
      isSignature = true
    }
    if (!isSignature) {
      temp.push(line)
    }
  }
  emails.push(temp.join('\n').trim())
  temp = []

  return emails
}
