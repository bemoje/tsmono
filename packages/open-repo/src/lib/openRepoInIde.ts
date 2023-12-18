import path from 'path'
import { exec } from 'child_process'

export function openRepoInIde(rootdir: string, IDE: string, dirname: string) {
  console.log('Opening repository: ', dirname)
  exec(`${IDE} ${path.join(rootdir, dirname)}`)
}
