export function normalizePathSep(fspath: string): string {
  return fspath.replace(/[\\/]+/g, '/').replace(/\/$/, '')
}

// console.log(normalizePathSep('C:/Users/BeMoje/Downloads/'))
// console.log(normalizePathSep('C://Users/BeMoje/Downloads/'))
// console.log(normalizePathSep('C:\\Users\\BeMoje\\Downloads'))
// console.log(normalizePathSep('C:\\\\Users\\BeMoje\\Downloads\\'))
