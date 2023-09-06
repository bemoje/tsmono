import * as fs from 'fs'
import * as path from 'path'
import { getPackages } from './util/getPackages'

const tsmonopkgpath = path.join(process.cwd(), 'package.json')
const tsmonopkg = JSON.parse(fs.readFileSync(tsmonopkgpath, 'utf8'))
const tdir = path.join(process.cwd(), 'scripts', 'template')

getPackages().forEach(({ rootdir, pkg, name }) => {
  const src = (filename: string) => path.join(tdir, filename)
  const dest = (filename: string) => path.join(rootdir, filename)
  const overwrite = (destfile: string, srcfile?: string, transform?: (string: string) => string) => {
    let source = fs.readFileSync(src(srcfile || destfile), 'utf8')
    if (transform) source = transform(source)
    fs.writeFileSync(dest(destfile), source, 'utf8')
  }
  const readFile = (destfile: string) => {
    return fs.readFileSync(src(destfile), 'utf8')
  }
  const readJsonFile = (destfile: string) => {
    return JSON.parse(readFile(destfile))
  }
  const removeFile = (destfile: string) => {
    if (!fs.existsSync(dest(destfile))) return
    fs.rmSync(dest(destfile))
  }
  const removeDir = (dirname: string) => {
    if (!fs.existsSync(dest(dirname))) return
    fs.rmSync(dest(dirname), { recursive: true, force: true })
  }
  ///////////////////////////

  removeDir('node_modules/@bemoje')
  removeDir('docs')
  removeDir('dist')

  removeFile('rollup.config.js')
  removeFile('package-lock.json')
  removeFile('.npmignore')
  removeFile('.eslintrc.js')
  removeFile('tsconfig.bundle.json')

  overwrite('.eslintignore')
  overwrite('.eslintrc.json')
  overwrite('jest.config.ts')
  overwrite('LICENSE')
  overwrite('tsconfig.json')
  overwrite('tsconfig.lib.json')
  overwrite('tsconfig.spec.json')
  overwrite('project.json', 'project.json.txt', (source) => {
    return source.replace(/\{\{NAME\}\}/g, name)
    // .replace(/\{\{LIBRARY_OR_APPLICATION\}\}/g, pkg.preferGlobal ? 'application' : 'library')
  })

  delete pkg.types
  delete pkg.module
  delete pkg.browser
  pkg.main = './src/index.js'
  pkg.type = 'commonjs'
  pkg.typings = './src/index.d.ts'

  fs.writeFileSync(path.join(rootdir, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8')
})
