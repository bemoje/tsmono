/* eslint-disable no-undef */
// import { walkTsFiles } from './util/walkTsFiles'
import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'

const tdir = path.join(process.cwd(), 'scripts', 'template')
const npmignore = path.join(tdir, '.npmignore')
const rollup = path.join(tdir, 'rollup.config.js')
const bundle = path.join(tdir, 'tsconfig.bundle.json')
const eslintrc = path.join(tdir, '.eslintrc.js')
getPackages().forEach(({ rootdir, pkg }) => {
  // fs.writeFileSync(path.join(rootdir, '.npmignore'), fs.readFileSync(npmignore, 'utf8'), 'utf8')
  fs.writeFileSync(path.join(rootdir, 'rollup.config.js'), fs.readFileSync(rollup, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, 'tsconfig.bundle.json'), fs.readFileSync(bundle, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, '.eslintrc.js'), fs.readFileSync(eslintrc, 'utf8'), 'utf8')
  // fs.rmdirSync(path.join(rootdir, 'examples'), { recursive: true })
  // fs.mkdirSync(path.join(rootdir, 'docs', 'examples'), { recursive: true })
  // pkg.scripts = {
  //   'lint': 'eslint "*/**/*.{ts,js,json}" --fix',
  //   'test': 'jest --preset ts-jest',
  //   'build': 'rimraf dist && rollup --config ./rollup.config.js --bundleConfigAsCjs',
  //   'docsmd':
  //     'rimraf docs/md && typedoc --out docs/md/ src/index.ts --readme none --plugin typedoc-plugin-markdown --theme markdown --entryDocument index.md --publicPath /docs/md/',
  //   'docshtml': 'rimraf docs/html && typedoc --out docs/html --entryPoints src/index.ts',
  //   'prepub': 'npm run lint && npm run build && npm run test && npm run docsmd && npm run docshtml',
  //   'viewdocs': 'start docs/html/index.html',
  // }
  // pkg.scripts.rollup = 'rimraf dist && rollup --config ./rollup.config.js --bundleConfigAsCjs'
  // pkg.scripts.build = 'npm run lint && npm run rollup'
  // fs.writeFileSync(path.join(rootdir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
})

// const fpaths = walkTsFiles('C:/Users/bemoj/repos/bemoje-node-util/src')
// const res: [number, string][] = fpaths.map((fpath) => {
//   const stat = fs.statSync(fpath)
//   const size = stat.size
//   return [size, fpath]
// })
// const r = res
//   .sort((a: [number, string], b: [number, string]) => b[0] - a[0])
//   .map(([size, fpath]) => size + ' ' + fpath)
//   .join('\n')
// console.log(r)
