import { randomIntBetween } from '@bemoje/number'
import { bytesToInt } from './bytesToInt'
import { intToBytes } from './intToBytes'

describe('intToBytes', () => {
  it('throws when passed non-integer floating point number', () => {
    expect(() => intToBytes(1.1)).toThrowError(`input must be a positive integer. Got 1.1`)
  })
  it('throws when passed NaN', () => {
    expect(() => intToBytes(NaN)).toThrowError(`input must be a positive integer. Got NaN`)
  })
  it('throws when passed a negative value', () => {
    expect(() => intToBytes(-2)).toThrowError(`input must be a positive integer. Got -2`)
  })
  it('throws when passed an int larger than 256^5', () => {
    expect(() => intToBytes(256 ** 5 + 1)).toThrowError(
      `input must be less than or equal to 256^5. Got ${256 ** 5 + 1}`,
    )
  })
  it('does not throw when passed an int of exactly 256^5', () => {
    expect(() => intToBytes(256 ** 5)).not.toThrowError()
  })

  it('correctly converts randomly generated integers from various intervals', () => {
    const nums = [0, 256, 256 ** 2, 256 ** 3, 256 ** 4, 256 ** 5]
    const set = new Set(nums.slice().concat(0, 1, 250, 251, 252, 253, 254, 255, 256, 257))
    nums.forEach((n, i) => {
      set.add(n)
      if (i < nums.length - 1) {
        for (let j = 0; j < 1000; j++) {
          const r = randomIntBetween(n, nums[i + 1])
          if (Number.isInteger(r)) {
            set.add(r)
          }
        }
      }
    })
    const acc = Array.from(set)
    for (const n of acc) {
      const bytes = intToBytes(n)
      const int = bytesToInt(bytes)
      expect(n).toBe(int)
    }
  })
})
