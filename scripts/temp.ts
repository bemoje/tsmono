/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'

const tdir = path.join(process.cwd(), 'scripts', 'template')
const npmignore = path.join(tdir, '.npmignore')
const rollup = path.join(tdir, 'rollup.config.js')
getPackages().forEach(({ rootdir, pkg }) => {
  // fs.writeFileSync(path.join(rootdir, '.npmignore'), fs.readFileSync(npmignore, 'utf8'))
  fs.writeFileSync(path.join(rootdir, 'rollup.config.js'), fs.readFileSync(rollup, 'utf8'))
  // fs.rmdirSync(path.join(rootdir, 'examples'), { recursive: true })
  // fs.mkdirSync(path.join(rootdir, 'docs', 'examples'), { recursive: true })
  // pkg.scripts.docs = 'npm run docsmd && npm run docshtml'
  // fs.writeFileSync(path.join(rootdir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
})
