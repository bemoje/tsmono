import { tryCatchWrapSync } from './tryCatchWrapSync'

describe(tryCatchWrapSync.name, () => {
  describe('when the wrapped function does not throw an error', () => {
    it('should call the wrapped function with the correct arguments', () => {
      const func = jest.fn()
      const wrappedFunc = tryCatchWrapSync(func)
      wrappedFunc(1, 'two', true)
      expect(func).toHaveBeenCalledWith(1, 'two', true)
    })

    it('should return the result of the wrapped function', () => {
      const func = jest.fn().mockReturnValue('result')
      const wrappedFunc = tryCatchWrapSync(func)
      const result = wrappedFunc()
      expect(result).toBe('result')
    })

    it('should call the wrapped function with the correct context', () => {
      const context = { prop: 'value' }
      const func = jest.fn()
      const wrappedFunc = tryCatchWrapSync(func)
      wrappedFunc()
      expect(func).toHaveBeenCalledWith()
      expect(func.mock.instances[0]).toBe(context)
    })

    it('should not call the onError callback', () => {
      const onError = jest.fn()
      const func = jest.fn()
      const wrappedFunc = tryCatchWrapSync(func, onError)
      wrappedFunc()
      expect(onError).not.toHaveBeenCalled()
    })
  })

  describe('when the wrapped function throws an error', () => {
    it('should call the onError callback with the thrown error', () => {
      const onError = jest.fn()
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Test error')
      })
      const wrappedFunc = tryCatchWrapSync(func, onError)
      wrappedFunc()
      expect(onError).toHaveBeenCalledWith(new Error('Test error'))
    })

    it('should not return a value', () => {
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Test error')
      })
      const wrappedFunc = tryCatchWrapSync(func)
      const result = wrappedFunc()
      expect(result).toBeUndefined()
    })

    it('should call the wrapped function with the correct context', () => {
      const context = { prop: 'value' }
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Test error')
      })
      const wrappedFunc = tryCatchWrapSync(func)
      wrappedFunc()
      expect(func).toHaveBeenCalledWith()
      expect(func.mock.instances[0]).toBe(context)
    })

    it('should not call the onError callback if it is not provided', () => {
      const func = jest.fn().mockImplementation(() => {
        throw new Error('Test error')
      })
      const wrappedFunc = tryCatchWrapSync(func)
      wrappedFunc()
      expect(func).toHaveBeenCalled()
    })

    it('should not call the onError callback if the thrown error is not an instance of Error', () => {
      const onError = jest.fn()
      const func = jest.fn().mockImplementation(() => {
        throw 'Test error'
      })
      const wrappedFunc = tryCatchWrapSync(func, onError)
      wrappedFunc()
      expect(onError).not.toHaveBeenCalled()
    })
  })
})
