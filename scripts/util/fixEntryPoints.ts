import { green } from 'cli-color'
import fs from 'fs'
import path from 'path'
import { getPackages } from './getPackages'
import { walkTsFiles } from './walkTsFiles'

export function fixEntryPoints() {
  console.log(green('Fixing entry points...'))
  getPackages()
    .filter(({ pkg }) => !pkg.bin)
    .forEach(({ pkg, rootdir, name, pkgpath }) => {
      const srcdir = path.join(rootdir, 'src')
      const fpaths = walkTsFiles(srcdir, (filepath) => !filepath.endsWith('index.ts'))
      const lines = fpaths.map((fpath) => {
        const relative = fpath.replace(srcdir, '').replace(/\.ts$/i, '').replace(/\\/g, '/')
        return `export * from '.${relative}'`
      })
      const indexPath = path.join(srcdir, 'index.ts')

      const cur = fs
        .readFileSync(indexPath, 'utf8')
        .trim()
        .split('\n')
        .filter((line) => !!line.trim() && !line.trim().startsWith('export * from'))

      if (cur.length) {
        console.log('*******************************')
        console.log('*******************************')
        console.log(indexPath)
        console.log('*******************************')
        console.log('*******************************')
      } else {
        fs.writeFileSync(indexPath, lines.join('\n'))
      }
    })
}
