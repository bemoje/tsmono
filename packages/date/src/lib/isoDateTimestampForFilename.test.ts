import { isoDateTimestampForFilename } from './isoDateTimestampForFilename'

describe('isoDateTimestampForFilename', () => {
  it('should return a string in the format of YYYY-MM-DD-HH-mm-SS-sss', () => {
    const date = new Date('2022-01-01T00:00:00.000Z')
    const result = isoDateTimestampForFilename(date)
    expect(result).toEqual('2022-01-01-00-00-00-000')
  })

  it('should return a string with the current date and time if no date is provided', () => {
    const result = isoDateTimestampForFilename()
    const regex = /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{3}$/
    expect(result).toMatch(regex)
  })
})
