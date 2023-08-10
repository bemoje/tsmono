import { AbstractFsPath, DirectoryPath, FilePath } from '@bemoje/fspath'

export async function getLastMofifiedFileIn(dirpath: string, filter: (file: FilePath) => boolean): Promise<FilePath> {
  const dir = new DirectoryPath(dirpath)
  const children = await dir.readdir()
  const filtered: FilePath[] = children.filter(
    (p: AbstractFsPath) => p.isFilePath && filter(p as FilePath),
  ) as FilePath[]
  const withStat: [FilePath, number][] = await Promise.all(
    filtered.map(async (filepath) => [filepath, (await filepath.stat()).mtimeMs]),
  )
  const sorted = withStat.sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}
