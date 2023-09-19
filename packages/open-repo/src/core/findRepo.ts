import { exec } from 'child_process'
import path from 'path'

export function findRepo(rootdir: string, IDE: string, dirnames: string[], search: string) {
  if (/^\d+$/g.test(search)) search = dirnames[Number(search)]
  let found = false
  dirnames.forEach((dirname) => {
    if (found) return
    const fullpath = path.join(rootdir, dirname)
    if (!dirname.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    console.log('Opening repository: ', dirname)
    exec(`${IDE} ${fullpath}`)
    found = true
  })
  if (!found) {
    console.log(`No repositories found matching '${search}'.`)
  }
}
