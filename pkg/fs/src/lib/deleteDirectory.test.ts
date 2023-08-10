import fs from 'fs'
import { deleteDirectory } from './deleteDirectory'

describe(deleteDirectory.name, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should delete directory successfully', async () => {
    const dirpath = 'test'
    const rmMock = jest.spyOn(fs.promises, 'rm')
    await deleteDirectory(dirpath)
    expect(rmMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })

  it('should throw an error if the directory cannot be deleted', async () => {
    const dirpath = 'test'
    const rmMock = jest.spyOn(fs.promises, 'rm')
    const error = new Error('Failed to delete directory')
    rmMock.mockRejectedValue(error)
    await expect(deleteDirectory(dirpath)).rejects.toThrow(error)
    expect(rmMock).toHaveBeenCalledWith(dirpath, { recursive: true, force: true })
  })
})
