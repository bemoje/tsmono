import { waitSeconds } from './waitSeconds'

describe(waitSeconds.name, () => {
  describe('when secs is not provided', () => {
    it('should return a resolved promise', async () => {
      await expect(waitSeconds()).resolves.toBeUndefined()
    })
  })

  describe('when secs is a positive number', () => {
    it('should return a resolved promise', async () => {
      await expect(waitSeconds(2)).resolves.toBeUndefined()
    })

    it('should wait for the specified number of seconds before resolving', async () => {
      const start = Date.now()
      await waitSeconds(2)
      const end = Date.now()
      const elapsed = Math.floor((end - start) / 1000)
      expect(elapsed).toBe(2)
    })
  })

  describe('when secs is 0', () => {
    it('should return a resolved promise', async () => {
      await expect(waitSeconds(0)).resolves.toBeUndefined()
    })
  })

  describe('when secs is a negative number', () => {
    it('should return a rejected promise', async () => {
      await expect(waitSeconds(-1)).rejects.toThrow()
    })
  })
})
