import fs from 'fs'

export function parseDirectories(string: string): string[] {
  const arr = string.split(',').map((d) => d.trim())
  arr.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      console.error(`The directory ${dir} does not exist.`)
      process.exit(1)
    }
    if (!fs.statSync(dir).isDirectory()) {
      console.error(`The path ${dir} is not a directory.`)
      process.exit(1)
    }
  })
  return arr
}
