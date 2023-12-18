import { getDownloadsDirectory } from './getDownloadsDirectory'

describe(getDownloadsDirectory.name, () => {
  it('gets the user downloads directory', () => {
    expect(getDownloadsDirectory()?.endsWith('Downloads')).toBe(true)
  })
})
