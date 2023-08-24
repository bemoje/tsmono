/**
 * Splits a string of text into separate emails.
 *
 * The function works by splitting the input text into lines and then iterating over each line.
 * If a line contains an email address and there are more than four lines in the current email,
 * the current email is added to the list of emails and a new email is started.
 * If a line contains a signature (determined by the presence of certain keywords),
 * the line is not added to the current email.
 *
 * @param text - The string of text to split into separate emails.
 * @returns An array of strings, where each string is a separate email.
 */
export function splitEmails(text: string) {
  const lines = text
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
