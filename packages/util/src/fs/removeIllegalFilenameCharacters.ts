export function removeIllegalFilenameCharacters(string: string) {
  return string.replace(/[/\\?%*:|"<>]/g, '')
}
