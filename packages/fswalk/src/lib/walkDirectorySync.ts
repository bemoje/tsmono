import fs from 'fs-extra'
import path from 'path'
import walkdir from 'walkdir'
import { convertFilter } from './core/convertFilter'
import { IWalkDirectoryOptions } from './types/IWalkDirectoryOptions'

export function walkDirectorySync(
  dirpath: string,
  options: IWalkDirectoryOptions = {},
  callback?: (filepath: string, stat: fs.Stats) => void
): string[] {
  const no_return = !!callback
  const return_object = false
  const filter = options.filter ? convertFilter(options.filter) : undefined
  return walkdir.sync(dirpath, { ...options, no_return, return_object, filter }, callback)
}

// const outdir = path.normalize('C:/Users/bemoj/Desktop/temp-repos/backup')
// const root = path.join(process.cwd(), 'packages')
// const srcDirs = fs
//   .readdirSync(root)
//   .filter((name) => !name.startsWith('.'))
//   .map((name) => path.join(root, name, 'src'))
//   .forEach((dir) => {
//     const files = walkDirectorySync(dir, {}, (filepath, stat) => {
//       if (!stat.isFile()) return
//       const ext = path.extname(filepath)
//       if (ext === '.ts') return
//       if (/\.js$/.test(filepath)) {
//         const outpath = filepath.replace(root, outdir)
//         // console.log({ outpath })
//         fs.moveSync(filepath, outpath, { overwrite: true })
//       }
//     })
//   })
