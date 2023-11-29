export function parseString<O = string>(string: string): O {
  return string.trim() as O
}
