import * as path from 'path'
import fs from 'fs-extra'
import { Any, colors, readJsonFileSafeSync, readJsonFileSync } from '@bemoje/util'
import { getPackages } from './getPackages'
const { gray, magenta: green } = colors

export function fixTsConfigIncludes() {
  console.log(green('Fixing tsconfig includes...'))

  getPackages().forEach(({ name, pkgRootDir: rootdir }) => {
    // lib
    const libfname = 'tsconfig.lib.json'
    const libpath = path.join(rootdir, libfname)
    const lib: Any = readJsonFileSafeSync(libpath)
    if (lib) {
      const libinc = ['src/**/*.ts']
      if (!lib.include || !Array.isArray(lib.include)) lib.include = []
      if ((lib.include as string[]).join(',') !== libinc.join(',')) {
        lib.include = libinc
        fs.writeFileSync(libpath, JSON.stringify(lib, null, 2), 'utf8')
        console.log(gray('- fixed ' + libfname + ' in package: ' + name))
      }

      const libexc = ['jest.config.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts']
      if (!lib.exclude || !Array.isArray(lib.exclude)) lib.exclude = []
      if ((lib.exclude as string[]).join(',') !== libexc.join(',')) {
        lib.exclude = libexc
        fs.writeFileSync(libpath, JSON.stringify(lib, null, 2), 'utf8')
        console.log(gray('- fixed ' + libfname + ' in package: ' + name))
      }
    }

    // spec
    const specfname = 'tsconfig.spec.json'
    const specpath = path.join(rootdir, specfname)
    const spec: Any = readJsonFileSync(specpath)

    const specinc = ['jest.config.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.d.ts']
    if (!spec.include || !Array.isArray(spec.include)) spec.include = []
    if ((spec.include as string[]).join(',') !== specinc.join(',')) {
      spec.include = specinc
      fs.writeFileSync(specpath, JSON.stringify(spec, null, 2), 'utf8')
      console.log(gray('- fixed ' + specfname + ' in package: ' + name))
    }
  })
}
