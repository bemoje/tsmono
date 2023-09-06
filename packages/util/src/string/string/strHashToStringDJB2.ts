export function strHashToStringDJB2(string: string): number {
  let hash = 5381
  for (let i = 0; i < string.length; i++) {
    hash = (hash << 5) + hash + string.charCodeAt(i)
  }
  return hash
}
