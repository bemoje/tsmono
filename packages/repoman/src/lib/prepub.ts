import { colors, executeBatchScript } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import { deleteTmpDir } from './deleteTmpDir'
import { fixAll } from './fixAll'
import { getPackages } from './getPackages'

const { green } = colors

export function prepub(names: string[] = []) {
  fixAll()

  executeBatchScript(['nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : '')], {
    prependWithCall: true,
  })

  console.log(green('Finalizing dist directories...'))
  getPackages().forEach(({ pkg, rootdir, distdir }) => {
    const srcmd = path.join(rootdir, 'README.md')
    const distmd = path.join(distdir, 'README.md')
    if (fs.existsSync(srcmd)) {
      fs.mkdirSync(distdir, { recursive: true })
      fs.copyFileSync(srcmd, distmd)
    }

    if (pkg.preferGlobal) {
      const binIndex = ['#!/usr/bin/env node', "require('../index.cjs.js')"].join('\n')
      const distbin = path.join(distdir, 'bin')
      fs.mkdirpSync(distbin)
      fs.writeFileSync(path.join(distbin, 'index.js'), binIndex, 'utf8')
    }
  })

  deleteTmpDir()
}
