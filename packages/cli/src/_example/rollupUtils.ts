import walkdir from 'walkdir'
import { readFileSafeSync } from '@bemoje/util'
import { Stats } from 'fs-extra'
import { tsExtractImports } from '@bemoje/tscode'
import type { WalkOptions } from 'walkdir'

export function walkTsFiles(
  srcdir: string,
  filter: (filepath: string, stat: Stats) => boolean = () => true,
  options: WalkOptions = {}
): string[] {
  const result: string[] = []
  walkdir.sync(srcdir, options, (filepath, stat) => {
    if (!stat.isFile()) return
    if (!/\.ts$/i.test(filepath)) return
    // if (/\..+\.ts$/i.test(filepath)) return
    if (!filter(filepath, stat)) return
    result.push(filepath)
  })
  return result
}

const cliFilepaths = walkTsFiles('packages/cli/src')
const imports = cliFilepaths
  .map((filepath) => {
    const src = readFileSafeSync(filepath)
    // if(!src) return {filepath, imports: []}
    const imps = tsExtractImports(src || '')
      .map((imp) => {
        const res = imp.match.replace(/\n/g, '').replace(/\s+/g, ' ')
        if (!res.endsWith("from '@bemoje/util'")) return
        return res
          .replace(/^import \{ /, '')
          .replace("} from '@bemoje/util'", '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      })
      .flat()
      .map((s) => s?.trim())
      .filter(Boolean)
    return { filepath, imports: imps }
  })
  .filter((imp) => imp.imports.length)
console.dir(imports, { depth: null })
const set = new Set(imports.map((imp) => imp.imports).flat())
console.log(set)

const utilFilepaths = walkTsFiles('packages/util/src')

for (const name of set) {
  const filepath = utilFilepaths.find((filepath) => filepath.endsWith(`${name}.ts`))
  if (!filepath) console.log({ fileNonExistent: name })
}

// import { assertThat, funSetName, JsonValue, strFirstCharToUpperCase } from '@bemoje/util'
