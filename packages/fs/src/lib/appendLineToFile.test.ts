import fs from 'fs'
import path from 'path'
import { appendLineToFile } from './appendLineToFile'

describe(appendLineToFile.name, () => {
  it('should append the line to the file', async () => {
    const dirpath = path.join(process.env.TEMP as string, Date.now().toString())
    const filepath = path.join(dirpath, 'file.txt')
    const line = 'content'
    expect(fs.existsSync(dirpath)).toBe(false)
    await appendLineToFile(filepath, line)
    expect(fs.existsSync(dirpath)).toBe(true)
    expect(fs.existsSync(filepath)).toBe(true)
    const result = fs.readFileSync(filepath, 'utf8')
    expect(result).toBe(line + '\n')
    fs.rmSync(dirpath, { recursive: true, force: true })
    expect(fs.existsSync(dirpath)).toBe(false)
  })

  it('should append the line to the file with a linebreak before inserted string', async () => {
    const dirpath = path.join(process.env.TEMP as string, Date.now().toString())
    const filepath = path.join(dirpath, 'file.txt')
    const line = 'content'
    expect(fs.existsSync(dirpath)).toBe(false)
    await appendLineToFile(filepath, line, true)
    expect(fs.existsSync(dirpath)).toBe(true)
    expect(fs.existsSync(filepath)).toBe(true)
    const result = fs.readFileSync(filepath, 'utf8')
    expect(result).toBe('\n' + line)
    fs.rmSync(dirpath, { recursive: true, force: true })
    expect(fs.existsSync(dirpath)).toBe(false)
  })

  it('should append multiple lines', async () => {
    const dirpath = path.join(process.env.TEMP as string, Date.now().toString())
    const filepath = path.join(dirpath, 'file.txt')
    const line1 = 'content1'
    const line2 = 'content2'
    expect(fs.existsSync(dirpath)).toBe(false)
    await appendLineToFile(filepath, line1)
    expect(fs.existsSync(dirpath)).toBe(true)
    expect(fs.existsSync(filepath)).toBe(true)
    expect(fs.readFileSync(filepath, 'utf8')).toBe(line1 + '\n')
    await appendLineToFile(filepath, line2)
    expect(fs.readFileSync(filepath, 'utf8')).toBe(line1 + '\n' + line2 + '\n')
    fs.rmSync(dirpath, { recursive: true, force: true })
    expect(fs.existsSync(dirpath)).toBe(false)
  })
})
