import { execute, updateJsonFileSync } from '@bemoje/util'
import path from 'path'
import { fixPackageJson } from './fixPackageJson'

export function createPackage(name: string) {
  if (!name) throw new Error('No name provided')

  execute(
    `call nx g library ${name} --directory packages/${name} --name ${name} --importPath "@bemoje/${name}" --bundler rollup --testEnvironment node --unitTestRunner jest --compiler tsc`
  )
  execute(`call nx build ${name}`)
  execute(`call cd dist/packages/${name}`)
  execute(`call npm publish --access public`)

  fixPackageJson()

  updateJsonFileSync(path.join(process.cwd(), 'package.json'), (pkg) => {
    const deps = pkg.dependencies as Record<string, string>
    deps['@bemoje/' + name] = 'latest'
    return pkg
  })
}
