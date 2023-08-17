import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'

const tsmonopkgpath = path.join(process.cwd(), 'package.json')
const tsmonopkg = JSON.parse(fs.readFileSync(tsmonopkgpath, 'utf8'))

const tdir = path.join(process.cwd(), 'scripts', 'template')
const npmignore = path.join(tdir, '.npmignore')
const rollup = path.join(tdir, 'rollup.config.js')
const tsconfigspec = path.join(tdir, 'tsconfig.spec.json')
const jest = path.join(tdir, 'jest.config.ts')
const bundle = path.join(tdir, 'tsconfig.bundle.json')
const eslintrc = path.join(tdir, '.eslintrc.js')
const projectJson = path.join(tdir, 'project.json.txt')
getPackages().forEach(({ rootdir, pkg, name }) => {
  // fs.writeFileSync(path.join(rootdir, '.npmignore'), fs.readFileSync(npmignore, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, 'rollup.config.js'), fs.readFileSync(rollup, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, 'jest.config.ts'), fs.readFileSync(jest, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, 'tsconfig.spec.json'), fs.readFileSync(tsconfigspec, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, 'tsconfig.bundle.json'), fs.readFileSync(bundle, 'utf8'), 'utf8')
  // fs.writeFileSync(path.join(rootdir, '.eslintrc.js'), fs.readFileSync(eslintrc, 'utf8'), 'utf8')
  // fs.rmdirSync(path.join(rootdir, 'docs'), { recursive: true })
  // fs.mkdirSync(path.join(rootdir, 'docs', 'examples'), { recursive: true })
  pkg.scripts = {
    'build': 'rimraf dist && rollup --config ./rollup.config.js --bundleConfigAsCjs',
  }
  // Reflect.deleteProperty(pkg, 'devDependencies')
  // pkg.scripts.docsmd = `rimraf ../../docs/md/${name} && typedoc --out ../../docs/md/${name}/ src/index.ts --readme none --plugin typedoc-plugin-markdown --theme markdown --entryDocument index.md --publicPath "https://github.com/bemoje/tsmono/blob/main/docs/md/${name}/"`
  fs.writeFileSync(path.join(rootdir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
  // console.log('--------------------')
  // console.log(name)
  // console.log()
  // execBatch([`cd ${rootdir}`, 'depcheck --skip-missing'])
  // const project = fs
  //   .readFileSync(projectJson, 'utf8')
  //   .replace(/\{\{NAME\}\}/g, name)
  //   .replace(/\{\{LIBRARY_OR_APPLICATION\}\}/g, pkg.preferGlobal ? 'application' : 'library')
  // fs.writeFileSync(path.join(rootdir, 'project.json'), project, 'utf8')
})

// const fpaths = walkTsFiles('C:/Users/bemoj/repos/bemoje-node/src')
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
