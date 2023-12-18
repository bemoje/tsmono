import fs from 'fs-extra'
import path from 'path'
import { createDirectorySync } from './createDirectorySync'

describe(createDirectorySync.name, () => {
  it('should create directory successfully', () => {
    const dirpath = path.join(process.env['TEMP'] as string, Date.now().toString())
    expect(fs.existsSync(dirpath)).toBe(false)
    createDirectorySync(dirpath)
    expect(fs.existsSync(dirpath)).toBe(true)
    fs.rmSync(dirpath, { recursive: true, force: true })
    expect(fs.existsSync(dirpath)).toBe(false)
  })
})
