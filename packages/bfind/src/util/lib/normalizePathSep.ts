export function normalizePathSep(fspath: string): string {
  return fspath.replace(/[\\/]+/g, '/').replace(/\/$/, '')
}
