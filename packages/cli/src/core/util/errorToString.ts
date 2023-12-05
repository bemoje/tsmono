export function errorToString(error: unknown) {
  const name = error instanceof Error ? error.name : 'Error'
  const msg = error instanceof Error ? error.message : String(error)
  return name + ': ' + msg
}
