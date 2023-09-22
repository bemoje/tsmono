import { Stats } from 'fs'
import type { WalkOptions } from 'walkdir'
import walkdir from 'walkdir'

export function walkTsFiles(
  srcdir: string,
  filter: (filepath: string, stat: Stats) => boolean = () => true,
  options: WalkOptions = {},
): string[] {
  const result: string[] = []
  walkdir.sync(srcdir, options, (filepath, stat) => {
    if (!stat.isFile()) return
    if (!/\.ts$/i.test(filepath)) return
    if (/\..+\.ts$/i.test(filepath)) return
    if (!filter(filepath, stat)) return
    result.push(filepath)
  })
  return result
}
