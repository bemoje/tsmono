import fs from 'fs'
import { writeJsonFileSync } from './writeJsonFileSync'

describe(writeJsonFileSync.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should write JSON data to a file successfully', () => {
    const jsonData = { key: 'value' }
    const jsonString = JSON.stringify(jsonData)
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync')
    writeFileSyncMock.mockImplementation(() => undefined)
    writeJsonFileSync('test.json', jsonData)
    expect(writeFileSyncMock).toHaveBeenCalledWith('test.json', jsonString)
  })

  it('should throw an error if the file cannot be written', () => {
    const jsonData = { key: 'value' }
    const error = new Error('Failed to write file')
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync')
    writeFileSyncMock.mockImplementation(() => {
      throw error
    })
    expect(() => writeJsonFileSync('test.json', jsonData)).toThrow(error)
    expect(writeFileSyncMock).toHaveBeenCalledWith('test.json', JSON.stringify(jsonData))
  })
})
