import { strRepeat } from '../string/strRepeat'

export function formatJson(json: string, indents = 2): string {
  const p: string[] = []
  const push = (m: string): string => '\\' + p.push(m) + '\\'
  const pop = (m: string, i: number): string => p[i - 1]
  const tabs = (count: number) => new Array(count + 1).join(strRepeat(' ', indents))

  // backslashes and strings
  json = json
    .replace(/\\./g, push)
    .replace(/(".*?"|'.*?')/g, push)
    .replace(/\s+/, '')

  let res = ''
  let indent = 0

  // indent and insert newlines
  for (let i = 0; i < json.length; i++) {
    const c = json.charAt(i)
    switch (c) {
      case '{':
      case '[':
        res += c + '\n' + tabs(++indent)
        break
      case '}':
      case ']':
        res += '\n' + tabs(--indent) + c
        break
      case ',':
        res += ',\n' + tabs(indent)
        break
      case ':':
        res += ': '
        break
      default:
        res += c
        break
    }
  }

  // strip whitespace from numeric arrays and put backslashes and strings back in
  return res
    .replace(/\[[\d,\s]+?\]/g, (m) => m.replace(/\s/g, ''))
    .replace(/\\(\d+)\\/g, pop) // strings
    .replace(/\\(\d+)\\/g, pop) // backslashes in strings
}
