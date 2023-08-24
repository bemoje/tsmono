import fs from 'fs'
import { deleteDirectorySync } from './deleteDirectorySync'

describe(deleteDirectorySync.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should delete directory successfully', () => {
    const dirpath = 'test'
    const rmSyncMock = jest.spyOn(fs, 'rmSync')
    deleteDirectorySync(dirpath)
    expect(rmSyncMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })

  it('should return the directory path', () => {
    const dirpath = 'test'
    const rmSyncMock = jest.spyOn(fs, 'rmSync')
    const result = deleteDirectorySync(dirpath)
    expect(result).toEqual(dirpath)
    expect(rmSyncMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })
})
