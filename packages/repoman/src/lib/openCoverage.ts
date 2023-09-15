import { execute, isWindows } from '@bemoje/util'
import path from 'path'

export function openCoverage(packageName: string) {
  const url = path.join(process.cwd(), 'coverage', 'packages', packageName, 'index.html')
  if (isWindows()) execute(`start ${url}`)
  else execute(`xdg-open ${url}`)
}
