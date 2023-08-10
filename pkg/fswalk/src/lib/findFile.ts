import { regexEscapeString } from '@bemoje/node-util'
import path from 'path'
import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export async function findFile(
  dirpath: string,
  search: string,
  options: IWalkDirectoryOptions = {},
): Promise<string | undefined> {
  search = search.replace(/\\|\//g, path.sep)
  const regSearch = new RegExp(regexEscapeString(search), 'i')
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return await new Promise((resolve, reject) => {
    const emitter = walkdir(dirpath, { ...options, no_return: true, filter }) as walkdir.WalkEmitter
    emitter.on('file', (filepath: string) => {
      if (regSearch.test(filepath)) {
        emitter.end()
        resolve(filepath)
      }
    })
    emitter.on('end', () => resolve(undefined))
    emitter.on('error', (error) => reject(error))
  })
}

// export async function search(dirpath: string, search: string): Promise<string | undefined> {
//   return await new Promise((resolve, reject) => {
//     const emitter = walkdir(dirpath, {
//       no_return: true,
//       filter: (directory: string, files: string[]): string[] => {
//         if (directory.endsWith('\\node_modules')) return []
//         if (directory.endsWith('\\.git')) return []
//         return files.filter((file) => {
//           const stat = fs.statSync(path.join(directory, file))
//           if (stat.isDirectory()) {
//             if (file === 'node_modules') return false
//             if (file.startsWith('.')) return false
//             // console.log(file)
//             return true
//           } else {
//             return file.endsWith('.ts') && !/\.\w+\.ts$/i.test(file)
//           }
//         })
//       },
//     }) as walkdir.WalkEmitter
//     emitter.on('file', (filepath: string) => {
//       findInFile(filepath, search).catch((error) => console.error(error))
//     })
//     emitter.on('end', () => resolve(undefined))
//     emitter.on('error', (error) => reject(error))
//   })
// }

// async function findInFile(filepath: string, search: string) {
//   return await new Promise((resolve, reject) => {
//     const regSearch = new RegExp(regexEscapeString(search), 'i')
//     const stream = fs
//       .createReadStream(filepath)
//       .pipe(es.split())
//       .on('data', (line) => {
//         if (regSearch.test(line)) {
//           console.log(filepath)
//           stream.end()
//           resolve(filepath)
//         }
//       })
//       .on('error', function (err: any) {
//         console.log(err)
//         stream.end()
//         resolve(undefined)
//       })
//       .on('end', function () {
//         resolve(undefined)
//       })
//   })
// }

// search('C:/Users/bemoj/repos', "import fs from 'fs'")
