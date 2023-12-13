import fs from 'fs-extra'
import path from 'path'
import walkdir from 'walkdir'
import { readFileSafeSync } from '../src/util/fs/readFile/readFileSafeSync'
import { Stats } from 'fs-extra'
import type { WalkOptions } from 'walkdir'

/**
 * Extract all import statements from a given TypeScript source code string.
 * @param code The TypeScript code as a string from which to extract import statements.
 * @returns An array of objects, each representing an import statement. Each object includes the start and end line numbers (0-indexed) of the import statement in the original code, and the full text of the import statement.
 */
function tsExtractImports(code: string): ITsExtractImportsResult[] {
  code = code.replace(/;/g, '')
  const isFirstLine = /^import /
  const isFirstLineInMulti = /\{\s*$/
  const isLastLineInMulti = /^\} from '/
  const result: ITsExtractImportsResult[] = []
  let isMulti = false
  let impLines = []
  const lines = code.split(/\r?\n/)
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l]
    if (isFirstLine.test(line)) {
      if (isFirstLineInMulti.test(line)) {
        impLines.push(line)
        isMulti = true
      } else {
        result.push({
          start: l,
          end: l,
          match: line,
        })
      }
    } else if (isMulti) {
      impLines.push(line)
      if (isLastLineInMulti.test(line)) {
        result.push({
          start: l - impLines.length + 1,
          end: l,
          match: impLines.join('\n'),
        })
        impLines = []
        isMulti = false
      }
    }
  }
  return result
}

interface ITsExtractImportsResult {
  /**
   * The line index where the import statement starts.
   */
  start: number
  /**
   * The line index of the last line of the import statement.
   */
  end: number
  /**
   * The import statement.
   */
  match: string
}

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
          .replace(/^import( type)? \{/, '')
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
// console.dir(imports, { depth: null })
const set = new Set(imports.map((imp) => imp.imports).flat())
console.log(set)

const utilFilepaths = walkTsFiles('packages/util/src')

const filepaths = new Set<string>()

for (const name of set) {
  const filepath = utilFilepaths.find((filepath) => filepath.endsWith(`${name}.ts`))
  if (!filepath) {
    console.log({ fileNonExistent: name })
    continue
  }
  filepaths.add(filepath)
}
// console.log(filepaths)

function recurse(filepath: string) {
  const src = readFileSafeSync(filepath)
  for (const imp of tsExtractImports(src || '')) {
    const res = imp.match.replace(/\n/g, '').replace(/\s+/g, ' ')
    const regex = /from '\.\.?\//g
    if (!regex.test(res)) continue
    const relative = res.split(' from ')[1].replace(/['"]/g, '').trim()
    if (!relative) continue
    const resolved = path.resolve(path.dirname(filepath), relative + '.ts')
    // console.log({ relative, resolved })
    if (filepaths.has(resolved)) continue
    filepaths.add(resolved)
    recurse(resolved)
  }
}

filepaths.forEach(recurse)

for (const filepath of filepaths) {
  const testFilepath = filepath.replace(/\.ts$/, '.test.ts')
  if (fs.existsSync(testFilepath)) {
    filepaths.add(testFilepath)
  }
}

filepaths.forEach(recurse)

filepaths.forEach((filepath) => {
  filepath = filepath.replace(/\\+/g, '/')
  const destFilepath = filepath.replace('packages/util/src', 'packages/cli/src/util')
  // console.log({ filepath, destFilepath })
  fs.ensureDirSync(path.dirname(destFilepath))
  fs.copyFileSync(filepath, destFilepath)

  // const src = readFileSafeSync(filepath)
  // if (!src) {
  //   console.log({ NO_SOURCE_AT: filepath })
  //   return
  // }
  // for (const imp of tsExtractImports(src || '')) {
  //   const res = imp.match.replace(/\n/g, '').replace(/\s+/g, ' ')
  //   const regex = /from '\.\.?\//g
  //   if (regex.test(res)) continue
  //   externalImports.add(res)
  // }
  // source.push(tsStripImports(src))
  // const testFilepath = filepath.replace(/\.ts$/, '.test.ts')
  // if (fs.existsSync(testFilepath)) {
  //   testsource.push(readFileSync(testFilepath, 'utf8').replace(/from '\..+$/gm, "from './util'"))
  // }
})

// source.push([...externalImports].join('\n'))
// source.reverse()
// testsource.reverse()
// const result = source.join('\n\n\n').replace(/^export .+ from .+$/gm, (s) => s.replace('export ', 'import ') + '\n' + s)
// writeFileSafeSync('packages/cli/src/core/bemoje-util.ts', result)
// const testresult = testsource.join('\n\n\n')
// const testresultImports = [
//   ...new Set(testresult.split('\n').filter((l) => l.startsWith('import ') && l.endsWith("'"))),
// ].join('\n')
// const testresultCode = tsStripImports(testresult)
// writeFileSafeSync('packages/cli/src/core/bemoje-util.test.ts', testresultImports + '\n\n' + testresultCode)
