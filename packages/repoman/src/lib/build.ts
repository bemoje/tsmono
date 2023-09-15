import { colors, execute } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { deleteTmpDir } from './deleteTmpDir'
import { getPackages } from './getPackages'

export function build(names?: string[]) {
  execute('nx run-many -t build' + (names ? ' -p ' + names.join(',') : ''))

  console.log(colors.green('Finalizing dist directories...'))
  getPackages(names).forEach(({ pkg, rootdir, distdir }) => {
    const srcmd = path.join(rootdir, 'README.md')
    const distmd = path.join(distdir, 'README.md')
    if (fs.existsSync(srcmd)) {
      fs.mkdirSync(distdir, { recursive: true })
      fs.copyFileSync(srcmd, distmd)
    }

    if (pkg.preferGlobal) {
      const binIndex = ['#!/usr/bin/env node', "require('../index.cjs.js')"].join('\n')
      const distbin = path.join(distdir, 'bin')
      if (!fs.existsSync(distbin)) {
        fs.mkdirSync(distbin)
      }
      fs.writeFileSync(path.join(distbin, 'index.js'), binIndex, 'utf8')
    }
  })

  deleteTmpDir()
}
