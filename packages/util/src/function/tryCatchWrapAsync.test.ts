import { tryCatchWrapAsync } from './tryCatchWrapAsync'

describe(tryCatchWrapAsync.name, () => {
  describe('when the function does not throw an error', () => {
    it('should call the original function with the correct arguments', async () => {
      const originalFunc = jest.fn().mockResolvedValue(undefined)
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await wrappedFunc('arg1', 'arg2')
      expect(originalFunc).toHaveBeenCalledWith('arg1', 'arg2')
    })

    it('should return the value returned by the original function', async () => {
      const originalFunc = jest.fn().mockResolvedValue('result')
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      const result = await wrappedFunc()
      expect(result).toBe('result')
    })
  })

  describe('when the function throws an error', () => {
    it('should call the onError callback with the error', async () => {
      const rejectedValue = new Error('Something went wrong')
      const originalFunc = jest.fn().mockRejectedValue(rejectedValue)
      const onError = jest.fn()
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await wrappedFunc()
      expect(onError).toHaveBeenCalledWith(rejectedValue)
    })

    it('should reject the promise if captureRejections is false', async () => {
      const originalFunc = jest.fn().mockRejectedValue(new Error('Something went wrong'))
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await expect(wrappedFunc()).rejects.toThrowError('Something went wrong')
    })

    it('should not reject the promise if captureRejections is true', async () => {
      const originalFunc = jest.fn().mockRejectedValue(new Error('Something went wrong'))
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await expect(wrappedFunc()).resolves.toBeUndefined()
    })
  })

  describe('when the thisContext is provided', () => {
    it('should call the original function with the provided thisContext', async () => {
      const originalFunc = jest.fn().mockResolvedValue(undefined)
      const thisContext = { prop: 'value' }
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await wrappedFunc()
      expect(originalFunc).toHaveBeenCalledWith()
      expect(originalFunc.mock.instances[0]).toBe(thisContext)
    })
  })

  describe('when the thisContext is not provided', () => {
    it('should call the original function with the default thisContext', async () => {
      const originalFunc = jest.fn().mockResolvedValue(undefined)
      const wrappedFunc = tryCatchWrapAsync(originalFunc)
      await wrappedFunc()
      expect(originalFunc).toHaveBeenCalledWith()
      expect(originalFunc.mock.instances[0]).toBe(originalFunc)
    })
  })
})
