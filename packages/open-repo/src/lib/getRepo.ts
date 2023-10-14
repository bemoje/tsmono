export function getRepo(dirnames: string[], input: string): string {
  input = input.toLowerCase().trim()
  if (/^[0-9]+$/.test(input)) {
    const index = parseInt(input)
    if (!(Number.isInteger(index) && index >= 0 && index < dirnames.length - 1)) {
      console.log('Invalid index.')
      return ''
    }
    return dirnames[input]
  } else {
    for (const dirname of dirnames) {
      if (!dirname.toLowerCase().includes(input)) {
        continue
      }
      return dirname
    }
    console.log(`No repositories found matching '${input}'.`)
    return ''
  }
}
