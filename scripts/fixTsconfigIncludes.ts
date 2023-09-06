import * as fs from 'fs'
import * as path from 'path'
import { readJsonFileSync } from '../packages/fs/src/lib/readJsonFileSync'
import { getPackages } from './util/getPackages'

getPackages().forEach(({ rootdir }) => {
  const src = (filename: string) => path.join(rootdir, filename)

  const libpath = src('tsconfig.lib.json')
  const lib: Record<string, unknown> = readJsonFileSync(libpath)
  lib.include = ['src/**/*.ts']
  lib.exclude = ['jest.config.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts']
  fs.writeFileSync(libpath, JSON.stringify(lib, null, 2), 'utf8')

  const specpath = src('tsconfig.spec.json')
  const spec: Record<string, unknown> = readJsonFileSync(specpath)
  spec.include = ['jest.config.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.d.ts']
  fs.writeFileSync(specpath, JSON.stringify(spec, null, 2), 'utf8')
})
