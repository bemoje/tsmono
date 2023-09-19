import { execute, isWindows } from '@bemoje/util'

export function openDocs(): void {
  const url = 'docs/modules.html'
  if (isWindows()) execute(`start ${url}`)
  else execute(`xdg-open ${url}`)
}
