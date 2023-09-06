import fs from 'fs'
import path from 'path'
import { executeBatchScript } from '../../packages/util/src/node/virtual-script/executeBatchScript'
import { fixPackageJson } from './fixPackageJson'

const cwd = process.cwd()
export function createPackage(args: string[]) {
  const name = args[0]
  if (!name) throw new Error('No name provided')

  const cmds = [
    `call nx g library ${name} --directory packages/${name} --name ${name} --importPath "@bemoje/${name}" --bundler rollup --testEnvironment node --unitTestRunner jest --compiler tsc`,
    `call nx build ${name}`,
    `call cd dist/packages/${name}`,
    `call npm publish --access public`,
    'cd ' + cwd,
  ]

  executeBatchScript(cmds, {
    cwd,
  })

  fixPackageJson()

  const pkgpath = path.join(process.cwd(), 'package.json')
  const pkgjson = fs.readFileSync(pkgpath, 'utf8')
  const pkg = JSON.parse(pkgjson)
  pkg.dependencies['@bemoje/' + name] = 'latest'
  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2))
}
