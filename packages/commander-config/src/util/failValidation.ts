export function failValidation(name: string, msg: string) {
  console.error('Error: The ' + name + ' setting ' + msg)
  process.exit(1)
}
