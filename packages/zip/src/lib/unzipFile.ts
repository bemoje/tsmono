import extract from 'extract-zip'

export async function unzipFile(filepath: string, outdir: string) {
  await extract(filepath, { dir: outdir })
}
