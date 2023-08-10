/* eslint-disable no-undef */
import fs from 'fs'
import { walkTsFiles } from './util/walkTsFiles'

// const tdir = path.join(process.cwd(), 'scripts', 'template')
// const npmignore = path.join(tdir, '.npmignore')
// const rollup = path.join(tdir, 'rollup.config.js')
// getPackages().forEach(({ rootdir, pkg }) => {
//   // fs.writeFileSync(path.join(rootdir, '.npmignore'), fs.readFileSync(npmignore, 'utf8'))
//   fs.writeFileSync(path.join(rootdir, 'rollup.config.js'), fs.readFileSync(rollup, 'utf8'))
//   // fs.rmdirSync(path.join(rootdir, 'examples'), { recursive: true })
//   // fs.mkdirSync(path.join(rootdir, 'docs', 'examples'), { recursive: true })
//   // pkg.scripts.docs = 'npm run docsmd && npm run docshtml'
//   // fs.writeFileSync(path.join(rootdir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
// })

const fpaths = walkTsFiles('C:/Users/bemoj/repos/bemoje-node-util/src')
const res: [number, string][] = fpaths.map((fpath) => {
  const stat = fs.statSync(fpath)
  const size = stat.size
  return [size, fpath]
})
const r = res
  .sort((a: [number, string], b: [number, string]) => b[0] - a[0])
  .map(([size, fpath]) => size + ' ' + fpath)
  .join('\n')
console.log(r)
