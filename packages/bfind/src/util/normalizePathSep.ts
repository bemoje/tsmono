import path from 'path'

export function normalizePathSep(fspath: string): string {
  return fspath.replace(regReplaceSep, path.sep).replace(regRemoveTrailingSep, '')
}

const regReplaceSep = /(\\|\/)/g
const regRemoveTrailingSep = new RegExp('\\' + path.sep + '$', 'g')

// console.log(normalizePathSep('C:/Users/BeMoje/Downloads//'))
// console.log(normalizePathSep('C://Users/BeMoje/Downloads/'))
// console.log(normalizePathSep('C:\\Users\\BeMoje\\Downloads'))
// console.log(normalizePathSep('C:\\\\Users\\BeMoje\\Downloads\\'))
