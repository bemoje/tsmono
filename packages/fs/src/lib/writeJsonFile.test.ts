import fs from 'fs'
import { writeJsonFile } from './writeJsonFile'

describe(writeJsonFile.name, () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should write JSON data to a file successfully', async () => {
    const jsonData = { key: 'value' }
    const jsonString = JSON.stringify(jsonData)
    const writeFileMock = jest.spyOn(fs.promises, 'writeFile')
    writeFileMock.mockResolvedValue(undefined)
    await writeJsonFile('test.json', jsonData)
    expect(writeFileMock).toHaveBeenCalledWith('test.json', jsonString)
  })

  it('should throw an error if the file cannot be written', async () => {
    const jsonData = { key: 'value' }
    const error = new Error('Failed to write file')
    const writeFileMock = jest.spyOn(fs.promises, 'writeFile')
    writeFileMock.mockRejectedValue(error)
    await expect(writeJsonFile('test.json', jsonData)).rejects.toThrow(error)
    expect(writeFileMock).toHaveBeenCalledWith('test.json', JSON.stringify(jsonData))
  })
})
