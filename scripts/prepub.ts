import fs from 'fs-extra'
import path from 'path'
import { execBatch } from '../packages/node/src/lib/execBatch'
import { docs } from './util/docs'
import { fixDependencies } from './util/fixDependencies'
import { fixEntryPoints } from './util/fixEntryPoints'
import { fixReadmes } from './util/fixReadmes'
import { getPackages } from './util/getPackages'
const names = process.argv.slice(2)

fixEntryPoints()
fixDependencies()
fixReadmes()

getPackages().forEach(({ name, rootdir, pkgpath, pkg }) => {
  if (names.length && !names.includes(name)) return
  execBatch(['cd ' + rootdir, 'npm update'], () => process.exit())
})

execBatch(['nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : '')])

docs()

getPackages().forEach(({ name, pkg, pkgpath, rootdir, distdir }) => {
  const srcmd = path.join(rootdir, 'README.md')
  const distmd = path.join(distdir, 'README.md')
  if (fs.existsSync(srcmd)) {
    fs.copyFileSync(srcmd, distmd)
  }

  const binIndex = ['#!/usr/bin/env node', "require('../index.cjs.js')"].join('\n')
  const distbin = path.join(distdir, 'bin')
  fs.mkdirpSync(distbin)
  fs.writeFileSync(path.join(distbin, 'index.js'), binIndex, 'utf8')
})
