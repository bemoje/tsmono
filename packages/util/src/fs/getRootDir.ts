import path from 'path'

export function getRootDir() {
  return path.parse(process.cwd()).root
}
