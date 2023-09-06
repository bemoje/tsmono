import fs from 'fs-extra'
import path from 'path'
import { colors } from '../../packages/node/src/lib/colors'
import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'
import { fixAll } from './fixAll'
import { getPackages } from './getPackages'
const { green } = colors

export function prepub(names: string[] = process.argv.slice(2)) {
  fixAll()

  executeBatchScript(['nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : '')], {
    prependWithCall: true,
  })

  console.log(green('Finalizing dist directories...'))
  getPackages().forEach(({ name, pkg, pkgpath, rootdir, distdir }) => {
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
}
