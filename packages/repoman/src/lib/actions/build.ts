import fs from 'fs-extra'
import path from 'path'
import { colors, createDirectorySync, execute } from '@bemoje/util'
import { deleteTmpDir } from '../util/deleteTmpDir'
import { getPackages } from '../util/getPackages'

export function build(names?: string[]) {
  execute('nx run-many -t build' + (names ? ' -p ' + names.join(',') : ''))

  console.log(colors.magenta('Finalizing dist directories...'))
  getPackages(names).forEach(({ pkg, rootdir, distdir }) => {
    const srcmd = path.join(rootdir, 'README.md')
    const distmd = path.join(distdir, 'README.md')
    if (fs.existsSync(srcmd)) {
      fs.mkdirSync(distdir, { recursive: true })
      fs.copyFileSync(srcmd, distmd)
    }

    if (pkg.preferGlobal) {
      // if (fs.existsSync(path.join(rootdir, 'bin'))) {
      //   fs.copySync(path.join(rootdir, 'bin'), path.join(distdir, 'bin'))
      // } else {
      // }
      const binIndex = ['#!/usr/bin/env node', "require('../index.cjs.js').main();"].join('\n')
      const distbin = path.join(distdir, 'bin')
      createDirectorySync(distbin)
      // fs.writeFileSync(path.join(distbin, 'index.js'), binIndex, 'utf8')
    }
  })

  deleteTmpDir()
}
