import fs from 'fs'
import { deleteDirectorySafe } from './deleteDirectorySafe'

describe(deleteDirectorySafe.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should delete directory successfully if it exists', async () => {
    const dirpath = 'test'
    const existsSyncMock = jest.spyOn(fs, 'existsSync')
    existsSyncMock.mockReturnValue(true)
    const rmMock = jest.spyOn(fs.promises, 'rm')
    await deleteDirectorySafe(dirpath)
    expect(existsSyncMock).toHaveBeenCalledWith(dirpath)
    expect(rmMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })

  it('should not delete directory if it does not exist', async () => {
    const dirpath = 'test'
    const existsSyncMock = jest.spyOn(fs, 'existsSync')
    existsSyncMock.mockReturnValue(false)
    const rmMock = jest.spyOn(fs.promises, 'rm')
    await deleteDirectorySafe(dirpath)
    expect(existsSyncMock).toHaveBeenCalledWith(dirpath)
    expect(rmMock).not.toHaveBeenCalled()
  })

  it('should throw an error if the directory cannot be deleted', async () => {
    const dirpath = 'test'
    const existsSyncMock = jest.spyOn(fs, 'existsSync')
    existsSyncMock.mockReturnValue(true)
    const rmMock = jest.spyOn(fs.promises, 'rm')
    const error = new Error('Failed to delete directory')
    rmMock.mockRejectedValue(error)
    await expect(deleteDirectorySafe(dirpath)).rejects.toThrow(error)
    expect(existsSyncMock).toHaveBeenCalledWith(dirpath)
    expect(rmMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })
})
