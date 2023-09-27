import fs from 'fs-extra'
import path from 'path'

export function deleteTmpDir() {
  const tmpdir = path.join(process.cwd(), 'tmp')
  if (fs.existsSync(tmpdir)) {
    fs.rmSync(tmpdir, { recursive: true, force: true })
  }
}
