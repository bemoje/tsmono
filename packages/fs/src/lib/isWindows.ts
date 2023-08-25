export function isWindows() {
  return process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env['OSTYPE'] || ''))
}

export function isOSX() {
  return process.platform === 'darwin'
}

export function isLinux() {
  return process.platform === 'linux'
}
