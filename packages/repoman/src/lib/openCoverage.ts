import { execute, isWindows } from '@bemoje/util'

export function openCoverage() {
  const url = 'coverage/lcov-report/index.html'
  if (isWindows()) execute(`start ${url}`)
  else execute(`xdg-open ${url}`)
}
