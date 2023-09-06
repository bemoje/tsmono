import fs from 'fs'
import { deleteDirectorySafeSync } from './deleteDirectorySafeSync'

describe(deleteDirectorySafeSync.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should delete directory successfully if it exists', () => {
    const dirpath = 'test'
    const existsSyncMock = jest.spyOn(fs, 'existsSync')
    existsSyncMock.mockReturnValue(true)
    const rmSyncMock = jest.spyOn(fs, 'rmSync')
    const result = deleteDirectorySafeSync(dirpath)
    expect(existsSyncMock).toHaveBeenCalledWith(dirpath)
    expect(rmSyncMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
    expect(result).toEqual(dirpath)
  })

  it('should return the directory path if it does not exist', () => {
    const dirpath = 'test'
    const existsSyncMock = jest.spyOn(fs, 'existsSync')
    existsSyncMock.mockReturnValue(false)
    const rmSyncMock = jest.spyOn(fs, 'rmSync')
    const result = deleteDirectorySafeSync(dirpath)
    expect(existsSyncMock).toHaveBeenCalledWith(dirpath)
    expect(rmSyncMock).not.toHaveBeenCalled()
    expect(result).toEqual(dirpath)
  })
})
