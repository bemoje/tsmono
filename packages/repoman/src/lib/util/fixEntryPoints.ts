import fs from 'fs-extra'
import path from 'path'
import { arrSome, colors } from '@bemoje/util'
import { getPackages } from './getPackages'
import { walkTsFiles } from './walkTsFiles'
const { gray, magenta: green, red } = colors

export function fixEntryPoints(silent = false) {
  if (!silent) console.log(green('Fixing entry points...'))

  getPackages()
    // .filter(({ pkg }) => !pkg.bin)
    .forEach(({ rootdir, name }) => {
      const srcdir = path.join(rootdir, 'src')
      const indexFileDirs: string[] = []
      const fpaths = walkTsFiles(srcdir, (filepath) => {
        const isSrcRoot = path.dirname(filepath) === srcdir
        if (filepath.endsWith('index.ts')) {
          if (isSrcRoot) return false
          indexFileDirs.push(path.dirname(filepath))
        } else if (filepath.endsWith('cli.ts') && isSrcRoot) {
          return false
        }
        return true
      }).filter((filepath) => {
        if (filepath.endsWith('index.ts')) return true
        return !arrSome(indexFileDirs, (indexFile) => filepath.startsWith(indexFile))
      })
      const lines = fpaths.map((fpath) => {
        const relative = fpath
          .replace(srcdir, '')
          .replace(/\.ts$/i, '')
          .replace(/\\/g, '/')
          .replace(/\/index$/, '')
        return `export * from '.${relative}'`
      })
      const indexPath = path.join(srcdir, 'index.ts')
      const cur = fs.readFileSync(indexPath, 'utf8').trim().split('\n')
      const filtered = cur.filter((line) => !!line.trim() && !line.trim().startsWith('export * from'))
      if (filtered.length) {
        console.log(red('- Error: Index file has source code: ' + indexPath))
      } else if (lines.slice().sort().join('') !== cur.slice().sort().join('')) {
        console.log(gray('- changes in ' + name))
        fs.writeFileSync(indexPath, lines.join('\n'))
      }
    })
}
