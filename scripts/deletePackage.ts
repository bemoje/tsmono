import fs from 'fs'
import path from 'path'
import strip from 'strip-comments'

// args
const args = process.argv.slice(2)
const name = args[0]
if (!name) throw new Error('no name provided')

// delete package dir
fs.rmSync(path.join(process.cwd(), 'pkg', name), { recursive: true, force: true })

// tsconfig
const tsconfigpath = path.join(process.cwd(), 'tsconfig.json')
const json = strip(fs.readFileSync(tsconfigpath, 'utf8'))
const tsconfig = JSON.parse(json)
Reflect.deleteProperty(tsconfig.compilerOptions.paths, '@bemoje/' + name)
fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig, null, 2), 'utf8')

// package.json
const rootpkgpath = path.join(process.cwd(), 'package.json')
const pkg = JSON.parse(fs.readFileSync(rootpkgpath, 'utf8'))
pkg.workspaces = pkg.workspaces.filter((workspace: string) => workspace !== 'pkg/' + name)
fs.writeFileSync(rootpkgpath, JSON.stringify(pkg, null, 2), 'utf8')

// docs/html/index.html
const docsindexpath = path.join(process.cwd(), 'docs', 'html', 'index.html')
let docsindex = fs.readFileSync(docsindexpath, 'utf8')
const find = `<li><a href="./${name}/modules.html">${name}</a></li>`
const docsindexlines = docsindex.split('\n')
const docsindexline = docsindexlines.findIndex((line) => line.includes(find))
docsindexlines.splice(docsindexline, 1)
docsindex = docsindexlines.join('\n')
fs.writeFileSync(docsindexpath, docsindex, 'utf8')

// done
console.log(name + ' deleted')
