import fs from 'fs'
import path from 'path'
import { createDirectory } from './createDirectory'

describe(createDirectory.name, () => {
  it('should create directory successfully', async () => {
    const dirpath = path.join(process.env.TEMP as string, Date.now().toString())
    expect(fs.existsSync(dirpath)).toBe(false)
    await createDirectory(dirpath)
    expect(fs.existsSync(dirpath)).toBe(true)
    fs.rmSync(dirpath, { recursive: true, force: true })
    expect(fs.existsSync(dirpath)).toBe(false)
  })
})
