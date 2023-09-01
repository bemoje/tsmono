import fs from 'fs'
import { getPackages } from './getPackages'

export function updatePackages(
  update: (o: { name: string; rootdir: string; pkgpath: string; pkg: Record<string, any> }) => Record<string, any>,
): void {
  for (const { name, rootdir, pkgpath } of getPackages()) {
    const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8'))
    const result = update({ name, rootdir, pkgpath, pkg })
    fs.writeFileSync(pkgpath, JSON.stringify(result, null, 2), 'utf8')
  }
}
