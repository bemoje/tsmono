import fs from 'fs-extra'
import path from 'path'

export async function getLastMofifiedFileIn(dirpath: string): Promise<string> {
  const children = await fs.readdir(dirpath)
  const filtered = children
    .map((fname: string) => {
      const fpath = path.join(dirpath, fname)
      const stat = fs.statSync(fpath)
      return [fpath, stat.mtimeMs, stat.isFile()]
    })
    .filter((a) => a[2]) as [string, number, boolean][]
  const sorted = filtered.sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}
