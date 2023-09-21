import fs from 'fs'
import path from 'path'
import { cleanDirectorySync } from './cleanDirectorySync'

// Mock fs.readdirSync
jest.mock('fs', () => ({
  readdirSync: jest.fn(),
  statSync: jest.fn(),
  rmSync: jest.fn(),
}))

describe(cleanDirectorySync.name, () => {
  beforeEach(() => {
    // Clear mock function calls and return values before each test
    jest.clearAllMocks()
  })

  it('should remove files that satisfy the predicate', () => {
    // Mock fs.readdirSync to return an array of filenames
    const mockFilenames = ['file1.txt', 'file2.txt', 'file3.txt']
    ;(fs.readdirSync as jest.Mock).mockReturnValue(mockFilenames)

    // Mock fs.statSync to return a mock stat object
    const mockStat = { isFile: jest.fn().mockReturnValue(true) }
    ;(fs.statSync as jest.Mock).mockReturnValue(mockStat)

    // Mock the predicate function to return true for file2.txt
    const mockPredicate = jest.fn().mockImplementation((filepath, stat) => {
      return filepath === path.join('path/to/directory', 'file2.txt')
    })

    // Call the function
    cleanDirectorySync('path/to/directory', mockPredicate)

    // Verify that fs.rmSync was called only for file2.txt
    expect((fs.rmSync as jest.Mock).mock.calls).toEqual([[path.join('path/to/directory', 'file2.txt')]])
  })

  it('should not remove any files if the predicate returns false for all files', () => {
    // Mock fs.readdirSync to return an array of filenames
    const mockFilenames = ['file1.txt', 'file2.txt', 'file3.txt']
    ;(fs.readdirSync as jest.Mock).mockReturnValue(mockFilenames)

    // Mock fs.statSync to return a mock stat object
    const mockStat = { isFile: jest.fn().mockReturnValue(true) }
    ;(fs.statSync as jest.Mock).mockReturnValue(mockStat)

    // Mock the predicate function to always return false
    const mockPredicate = jest.fn().mockReturnValue(false)

    // Call the function
    cleanDirectorySync('path/to/directory', mockPredicate)

    // Verify that fs.rmSync was not called
    expect((fs.rmSync as jest.Mock).mock.calls).toEqual([])
  })
})
