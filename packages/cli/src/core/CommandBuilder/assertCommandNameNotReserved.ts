export function assertCommandNameNotReserved(name: string) {
  if (name === 'u' || name === 'util') {
    throw new Error(`Name '${name}' is reserved and is not available as name or alias.`)
  }
}
