import { green } from 'cli-color'
import fs from 'fs'
import path from 'path'
import { snakeCase } from 'snake-case'
import walkdir from 'walkdir'
import { strReplaceAll } from '../../packages/string/src'
import { execBatch } from './execBatch'
import { getPackages } from './getPackages'

export function docs() {
  console.log(green('Generating docs...'))

  const pkgspath = path.join(process.cwd(), 'packages')
  const indexpath = path.join(pkgspath, 'index.ts')

  // create index.ts (temp file)
  const src = fs
    .readdirSync(pkgspath)
    .filter((name) => name !== 'index.ts' && !name.startsWith('.'))
    .map((name) => `export * as ${snakeCase(name)} from './${name}/src'`)
    .join('\n')

  fs.writeFileSync(indexpath, src)

  // create docs
  execBatch(['npm run tsdoc'])
  fs.rmSync(indexpath)
  // fs.mkdirSync(path.join(process.cwd(), 'docs'))

  // fix docs
  const replace = getPackages().map(({ name }) => [snakeCase(name), name])
  const paths = walkdir.sync(path.join(process.cwd(), 'docs'))
  const htmlFiles = paths.filter((filepath) => filepath.endsWith('.html'))

  htmlFiles.forEach((filepath) => {
    let src: string = ''
    try {
      src = fs.readFileSync(filepath, 'utf8')
    } catch (error) {
      console.log(filepath)
    }
    src = src
      .replace(/Namespace/g, 'Package')
      .replace(/namespace/g, 'package')
      .replace(/\_\<wbr\/\>/g, '-<wbr/>')
    for (const [from, to] of replace) {
      src = strReplaceAll(src, from, to)
    }
    fs.writeFileSync(filepath, src, 'utf8')
  })

  htmlFiles.forEach((filepath) => {
    const orig = filepath + ''
    for (const [from, to] of replace) {
      filepath = strReplaceAll(filepath, from, to)
    }
    fs.renameSync(orig, filepath)
  })
}
