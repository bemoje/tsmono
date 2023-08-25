import fs from 'fs-extra'
import path from 'path'
import { execBatch } from '../packages/node/src/lib/execBatch'
import { docs } from './util/docs'
import { fixDependencies } from './util/fixDependencies'
import { fixEntryPoints } from './util/fixEntryPoints'
import { fixReadmes } from './util/fixReadmes'
import { getPackages } from './util/getPackages'
const names = process.argv.slice(2)

fixReadmes()
fixDependencies()
fixEntryPoints()

getPackages().forEach(({ name, rootdir, pkgpath, pkg }) => {
  execBatch(['cd ' + rootdir, 'npm update'], () => process.exit())
})

execBatch(['nx run-many -t "lint,test,build"' + (names.length ? ' -p ' + names.join(',') : '')])

const a = ['#!/usr/bin/env node', "require('../index.cjs.js')"]

docs()

getPackages().forEach(({ name, pkg, pkgpath, rootdir, distdir }) => {
  const srcmd = path.join(rootdir, 'README.md')
  const distmd = path.join(distdir, 'README.md')
  if (fs.existsSync(srcmd)) {
    fs.copyFileSync(srcmd, distmd)
  }

  const srcbin = path.join(rootdir, 'bin')
  const distbin = path.join(distdir, 'bin')
  if (fs.existsSync(srcbin)) {
    fs.copySync(srcbin, distbin)
  }
})
