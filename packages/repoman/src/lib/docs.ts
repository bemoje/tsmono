/* eslint-disable no-useless-escape */
import { colors, executeBatchScript, strReplaceAll } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { snakeCase } from 'snake-case'
import walkdir from 'walkdir'
import { getPackages } from './getPackages'

export function docs() {
  console.log(colors.green('Generating docs...'))

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
  const docspath = path.join(process.cwd(), 'docs')
  executeBatchScript(['rimraf docs', 'typedoc --out ./docs/ --entryPoints ./packages/index.ts'], {
    prependWithCall: true,
  })

  // remove temp index file
  fs.rmSync(indexpath, { force: true })

  // fix docs
  const paths = walkdir.sync(docspath)
  const htmlFiles = paths.filter((filepath) => filepath.endsWith('.html'))

  const replace = getPackages().map(({ name }) => [snakeCase(name), name])
  htmlFiles.forEach((filepath) => {
    let src = ''
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
