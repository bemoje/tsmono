export function parseBoolean(string: string): boolean {
  if (string !== 'true' && string !== 'false') {
    console.error(`The value ${string} is not a valid boolean value. Accepted values are 'true' and 'false'.`)
    process.exit(1)
  }
  return string === 'true'
}
