import fs from 'fs'
import path from 'path'
import strip from 'strip-comments'

const args = process.argv.slice(2)
const name = args[0]
if (!name) throw new Error('no name provided')
const isCLI = args[1] === 'true' ? true : false
const description = args[2] || ''

const template = path.join(process.cwd(), 'scripts', 'template')
const root = path.join(process.cwd(), 'pkg', name)
fs.mkdirSync(root, { recursive: true })
fs.readdirSync(template).map((filename) => {
  const fpath = path.join(template, filename)
  const stat = fs.statSync(fpath)
  if (stat.isDirectory()) {
    const subdirdest = path.join(root, filename)
    if (filename === 'bin' && isCLI) {
      fs.mkdirSync(subdirdest, { recursive: true })
      fs.copyFileSync(path.join(fpath, 'index.js'), path.join(subdirdest, 'index.js'))
    } else if (filename === 'src') {
      fs.mkdirSync(subdirdest, { recursive: true })
      fs.copyFileSync(path.join(fpath, 'index.ts'), path.join(subdirdest, 'index.ts'))
      fs.copyFileSync(path.join(fpath, 'test.test.ts'), path.join(subdirdest, 'test.test.ts'))
    }
  } else {
    fs.copyFileSync(fpath, path.join(root, filename))
  }
  fs.mkdirSync(path.join(root, 'docs', 'examples'), { recursive: true })
})

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
pkg.name = '@bemoje/' + name
pkg.description = description
if (!isCLI) {
  Reflect.deleteProperty(pkg, 'bin')
  Reflect.deleteProperty(pkg, 'preferGlobal')
  Reflect.deleteProperty(pkg, 'module')
  Reflect.deleteProperty(pkg, 'browser')
}
fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')

const tsconfigpath = path.join(process.cwd(), 'tsconfig.json')
const json = strip(fs.readFileSync(tsconfigpath, 'utf8'))
const tsconfig = JSON.parse(json)
tsconfig.compilerOptions.paths['@bemoje/' + name] = ['./pkg/' + name + '/src/index.ts']
fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig, null, 2), 'utf8')

const rootpkgpath = path.join(process.cwd(), 'package.json')
const rootpkg = JSON.parse(fs.readFileSync(rootpkgpath, 'utf8'))
rootpkg.workspaces.push('pkg/' + name)
fs.writeFileSync(rootpkgpath, JSON.stringify(rootpkg, null, 2), 'utf8')

console.log(name + ' initialized')
