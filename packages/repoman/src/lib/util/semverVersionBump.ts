export function semverVersionBump(version: string | (string | number)[], level: 'major' | 'minor' | 'patch'): string {
  const arr = (typeof version === 'string' ? version.split('.') : version).map(Number)
  if (level === 'major') {
    arr[0] += 1
    arr[1] = 0
    arr[2] = 0
  } else if (level === 'minor') {
    arr[1] += 1
    arr[2] = 0
  } else if (level === 'patch') {
    arr[2] += 1
  }
  return arr.join('.')
}
