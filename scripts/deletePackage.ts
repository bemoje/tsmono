import fs from 'fs'
import path from 'path'
import strip from 'strip-comments'

const args = process.argv.slice(2)
const name = args[0]
if (!name) throw new Error('no name provided')

fs.rmSync(path.join(process.cwd(), 'pkg', name), { recursive: true, force: true })

const tsconfigpath = path.join(process.cwd(), 'tsconfig.json')
const json = strip(fs.readFileSync(tsconfigpath, 'utf8'))
const tsconfig = JSON.parse(json)
Reflect.deleteProperty(tsconfig.compilerOptions.paths, '@bemoje/' + name)
fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig, null, 2), 'utf8')

const rootpkgpath = path.join(process.cwd(), 'package.json')
const rootpkg = JSON.parse(fs.readFileSync(rootpkgpath, 'utf8'))
rootpkg.workspaces = rootpkg.workspaces.filter((workspace: string) => workspace !== 'pkg/' + name)
fs.writeFileSync(rootpkgpath, JSON.stringify(rootpkg, null, 2), 'utf8')

console.log(name + ' deleted')
