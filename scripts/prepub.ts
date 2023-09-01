import fs from 'fs-extra'
import path from 'path'
import { execBatch } from '../packages/node/src/lib/execBatch'
import { fixDependencies } from './util/fixDependencies'
import { fixEntryPoints } from './util/fixEntryPoints'
import { fixReadmes } from './util/fixReadmes'
import { getPackages } from './util/getPackages'

const names = process.argv.slice(2)

fixEntryPoints()
fixDependencies()
fixReadmes()
// npmUpdate()

execBatch(['nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : '')])

console.log('Finalizing dist directories...')
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
