import fs from 'fs'
import { readJsonFile } from './readJsonFile'

describe(readJsonFile.name, () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should read and parse JSON file successfully', async () => {
    const jsonData = { key: 'value' }
    const jsonString = JSON.stringify(jsonData)
    const readFileMock = jest.spyOn(fs.promises, 'readFile')
    readFileMock.mockResolvedValue(Buffer.from(jsonString))
    const result = await readJsonFile('test.json')
    expect(result).toEqual(jsonData)
    expect(readFileMock).toHaveBeenCalledWith('test.json', 'utf8')
  })

  it('should throw an error if the file cannot be read', async () => {
    const readFileMock = jest.spyOn(fs.promises, 'readFile')
    const error = new Error('Failed to read file')
    readFileMock.mockRejectedValue(error)
    await expect(readJsonFile('test.json')).rejects.toThrow(error)
    expect(readFileMock).toHaveBeenCalledWith('test.json', 'utf8')
  })

  it('should throw an error if the file has invalid JSON', async () => {
    const readFileMock = jest.spyOn(fs.promises, 'readFile')
    const invalidJsonString = 'invalid json'
    readFileMock.mockResolvedValue(Buffer.from(invalidJsonString))
    await expect(readJsonFile('test.json')).rejects.toThrow(SyntaxError)
    expect(readFileMock).toHaveBeenCalledWith('test.json', 'utf8')
  })
})
