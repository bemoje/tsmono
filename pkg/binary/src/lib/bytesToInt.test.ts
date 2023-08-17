import { bytesToInt } from './bytesToInt'

describe('bytesToInt', () => {
  describe('when bytes length is 1 and bytes[0] < 251', () => {
    it('should return bytes[0]', () => {
      expect(bytesToInt([0])).toBe(0)
      expect(bytesToInt([250])).toBe(250)
    })
  })

  describe('when bytes length is 2 and bytes[0] === 251', () => {
    it('should return 251 + bytes[1]', () => {
      expect(bytesToInt([251, 0])).toBe(251)
      expect(bytesToInt([251, 5])).toBe(256)
    })
  })

  describe('when bytes length is 3 and bytes[0] === 252', () => {
    it('should return 251 + 256 * bytes[1] + bytes[2]', () => {
      expect(bytesToInt([252, 0, 0])).toBe(251)
      expect(bytesToInt([252, 1, 0])).toBe(507)
      expect(bytesToInt([252, 1, 5])).toBe(512)
    })
  })

  it('throws when passed an invalid byte-array', () => {
    expect(() => bytesToInt([252, 252])).toThrowError(`Invalid first byte. Got length: 2, and bytes: [252, 252]`)
    expect(() => bytesToInt([253, 5, 1])).toThrowError(`Invalid first byte. Got length: 3, and bytes: [253, 5, 1]`)
    expect(() => bytesToInt([255, 7, 15, 255, 255, 255, 240, 81])).toThrowError(
      `Invalid bytes. Got [255, 7, 15, 255, 255, 255, 240, 81] = 1099511627776.0625`,
    )
  })

  it('throws when passed byte array corresponding to an int larger than 256^5', () => {
    expect(() => bytesToInt([255, 7, 15, 255, 255, 255, 240, 96])).toThrowError(
      `Bytes must correspond to an integer less than or equal to 256^5. Got [255, 7, 15, 255, 255, 255, 240, 96] = 1099511627777`,
    )
  })

  it('does not throws when passed byte array corresponding to an int larger exactly 256^5', () => {
    expect(() => bytesToInt([255, 7, 15, 255, 255, 255, 240, 80])).not.toThrowError(
      `Bytes must correspond to an integer less than or equal to 256^5. Got [255, 7, 15, 255, 255, 255, 240, 80] = 1099511627776`,
    )
  })
})
