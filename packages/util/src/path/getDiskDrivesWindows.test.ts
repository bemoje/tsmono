import { isWindows } from '../os/isWindows'
import { getDiskDrivesWindows } from './getDiskDrivesWindows'

describe(getDiskDrivesWindows.name, () => {
  it('gets disk drives', () => {
    if (isWindows()) {
      for (const drive of getDiskDrivesWindows()) {
        expect(drive).toMatch(/^[a-z]:\\$/i)
      }
    } else {
      expect(() => {
        getDiskDrivesWindows()
      }).toThrow()
    }
  })
})
