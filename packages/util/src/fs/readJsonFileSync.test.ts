import fs from 'fs'
import { readJsonFileSync } from './readJsonFileSync'

describe(readJsonFileSync.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should read and parse JSON file successfully', () => {
    const jsonData = { key: 'value' }
    const jsonString = JSON.stringify(jsonData)
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync')
    readFileSyncMock.mockReturnValue(Buffer.from(jsonString))
    const result = readJsonFileSync('test.json')
    expect(result).toEqual(jsonData)
    expect(readFileSyncMock).toHaveBeenCalledWith('test.json', 'utf8')
  })

  it('should throw an error if the file cannot be read', () => {
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync')
    const error = new Error('Failed to read file')
    readFileSyncMock.mockImplementation(() => {
      throw error
    })
    expect(() => readJsonFileSync('test.json')).toThrow(error)
    expect(readFileSyncMock).toHaveBeenCalledWith('test.json', 'utf8')
  })

  it('should throw an error if the file has invalid JSON', () => {
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync')
    const invalidJsonString = 'invalid json'
    readFileSyncMock.mockReturnValue(Buffer.from(invalidJsonString))
    expect(() => readJsonFileSync('test.json')).toThrow(SyntaxError)
    expect(readFileSyncMock).toHaveBeenCalledWith('test.json', 'utf8')
  })
})
