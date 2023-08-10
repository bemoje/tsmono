import extract from 'extract-zip'
import fs from 'fs'
import path from 'path'

/**
 * @param source Either a directory containing zip files or an array of zip file paths.
 */
export async function unzipMergeFiles(source: string | string[], target: string) {
  if (typeof source === 'string') {
    source = fs.readdirSync(source).map((filename) => {
      return path.join(source as string, filename)
    })
  }
  for (const filepath of source) {
    const stat = await fs.promises.stat(filepath)
    if (stat.isDirectory()) continue
    if (!filepath.endsWith('.zip')) continue
    await extract(filepath, { dir: target })
  }
}
