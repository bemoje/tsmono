import fs from 'fs'
import path from 'path'
import strip from 'strip-comments'

//args
const args = process.argv.slice(2)
const name = args[0]
if (!name) throw new Error('no name provided')
const isCLI = args[1] === 'true' ? true : false
const description = args[2] || ''

// copy template dir
const template = path.join(process.cwd(), 'scripts', 'template')
const root = path.join(process.cwd(), 'packages', name)
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
      const libdir = path.join(subdirdest, 'lib')
      fs.mkdirSync(libdir, { recursive: true })
    }
  } else {
    fs.copyFileSync(fpath, path.join(root, filename))
  }
})

// tsmono package.json
const rootpkgpath = path.join(process.cwd(), 'package.json')
const rootpkg = JSON.parse(fs.readFileSync(rootpkgpath, 'utf8'))
rootpkg.workspaces.push('packages/' + name)
fs.writeFileSync(rootpkgpath, JSON.stringify(rootpkg, null, 2), 'utf8')

// package.json
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
pkg.name = '@bemoje/' + name
pkg.description = description
if (!isCLI) {
  Reflect.deleteProperty(pkg, 'bin')
  Reflect.deleteProperty(pkg, 'preferGlobal')
} else {
  Reflect.deleteProperty(pkg, 'browser')
  Reflect.deleteProperty(pkg, 'module')
}
pkg.scripts = {
  'build': 'rimraf dist && rollup --config ./rollup.config.js --bundleConfigAsCjs',
}

fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')

// project.json
const projectJson = path.join(template, 'project.json')
const project = fs
  .readFileSync(projectJson, 'utf8')
  .replace(/\{\{NAME\}\}/g, name)
  .replace(/\{\{LIBRARY_OR_APPLICATION\}\}/g, pkg.preferGlobal ? 'application' : 'library')
fs.writeFileSync(path.join(root, 'project.json'), project, 'utf8')

// tsconfig
const tsconfigpath = path.join(process.cwd(), 'tsconfig.json')
const json = strip(fs.readFileSync(tsconfigpath, 'utf8'))
const tsconfig = JSON.parse(json)
tsconfig.compilerOptions.paths['@bemoje/' + name] = ['./packages/' + name + '/src/index.ts']
fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig, null, 2), 'utf8')

// docs/html/index.html
// const docsindexpath = path.join(process.cwd(), 'docs', 'index.html')
// let docsindex = fs.readFileSync(docsindexpath, 'utf8')
// const find = pkg.preferGlobal ? '<h2>Applications</h2>' : '<h2>Libraries</h2>'
// const docsindexlines = docsindex.split('\n')
// const docsindexline = 2 + docsindexlines.findIndex((line) => line.includes(find))
// docsindexlines.splice(docsindexline, 0, `<li><a href="./${name}/modules.html">${name}</a></li>`)
// docsindex = docsindexlines.join('\n')
// fs.writeFileSync(docsindexpath, docsindex, 'utf8')

// done
console.log(name + ' initialized')
