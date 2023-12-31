import fs from 'fs-extra'
import path from 'path'
import { execute } from '@bemoje/util'
import { getPackages } from '../util/getPackages'

export function deletePackage(name: string) {
  if (!name) throw new Error('No name provided')

  execute(`npm uninstall @bemoje/${name}`)
  getPackages().forEach(({ pkgRootDir: rootdir, pkg }) => {
    if (Object.keys(pkg.dependencies || {}).includes(`@bemoje/${name}`)) {
      execute(`npm uninstall @bemoje/${name}`, { cwd: rootdir })
    }
  })
  execute(`nx g @nrwl/workspace:remove ${name}`)

  try {
    fs.rmSync(path.join(process.cwd(), 'dist', 'packages', name), { recursive: true, force: true })
  } catch (error) {
    //
  }
}
