import { OutputManager } from './OutputManager'

describe(OutputManager.name, () => {
  describe('getInstance', () => {
    it('should return the same instance of OutputManager', () => {
      const instance1 = OutputManager.getInstance()
      const instance2 = OutputManager.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('colors', () => {
    it('should have enabled property set to true by default', () => {
      const outputManager = new OutputManager()
      expect(outputManager.colors.enabled).toBe(true)
    })
  })

  describe('stdout', () => {
    it('should have write method enabled by default', () => {
      const outputManager = new OutputManager()
      expect(outputManager.stdout.isEnabled).toBe(true)
    })

    it('should disable the write method', () => {
      const outputManager = new OutputManager()
      outputManager.stdout.disable()
      expect(outputManager.stdout.isEnabled).toBe(false)
    })
  })

  describe('stderr', () => {
    it('should have write method enabled by default', () => {
      const outputManager = new OutputManager()
      expect(outputManager.stderr.isEnabled).toBe(true)
    })

    it('should enable the write method', () => {
      const outputManager = new OutputManager()
      outputManager.stderr.disable()
      expect(outputManager.stderr.isEnabled).toBe(false)
    })
  })

  describe('debug', () => {
    it('should have debug method disabled by default', () => {
      const outputManager = new OutputManager()
      expect(outputManager.debug.isEnabled).toBe(false)
    })

    it('should enable the debug method', () => {
      const outputManager = new OutputManager()
      outputManager.debug.enable()
      expect(outputManager.debug.isEnabled).toBe(true)
    })
  })

  describe('reset', () => {
    it('should enable colors', () => {
      const outputManager = new OutputManager()
      outputManager.colors.enabled = false
      outputManager.reset()
      expect(outputManager.colors.enabled).toBe(true)
    })

    it('should enable the write method of process.stdout', () => {
      const outputManager = new OutputManager()
      outputManager.stdout.disable()
      outputManager.reset()
      expect(outputManager.stdout.isEnabled).toBe(true)
    })

    it('should enable the write method of process.stderr', () => {
      const outputManager = new OutputManager()
      outputManager.stderr.disable()
      outputManager.reset()
      expect(outputManager.stderr.isEnabled).toBe(true)
    })

    it('should disable the debug method of console', () => {
      const outputManager = new OutputManager()
      outputManager.debug.enable()
      outputManager.reset()
      expect(outputManager.debug.isEnabled).toBe(false)
    })

    it('should return the OutputManager instance', () => {
      const outputManager = new OutputManager()
      expect(outputManager.reset()).toBe(outputManager)
    })
  })

  describe('outputDebug', () => {
    it('should log the debug message to the console if debug method is enabled', () => {
      const outputManager = new OutputManager()
      outputManager.debug.enable()
      const spy = jest.spyOn(console, 'debug').mockImplementation(() => {})
      outputManager.outputDebug(() => 'msg')
      expect(spy).toHaveBeenCalledWith('msg')
    })
  })

  describe('drainDebugMessageQueue', () => {
    it('should log all the messages in the debug message queue to the console', () => {
      const outputManager = new OutputManager()
      const spy = jest.spyOn(console, 'debug')
      outputManager.outputDebug(() => 'msg')
      outputManager.outputDebug(() => 'msg')
      outputManager.drainDebugMessageQueue()
      expect(spy).toHaveBeenCalledTimes(2)
    })

    it('should empty the debug message queue', () => {
      const outputManager = new OutputManager()
      outputManager.outputDebug(() => 'msg')
      outputManager.drainDebugMessageQueue()
      expect(outputManager.queueSize).toBe(0)
    })
  })

  describe('queueSize', () => {
    it('should return number of debug messages in the queue', () => {
      const outputManager = new OutputManager()
      expect(outputManager.queueSize).toBe(0)
      outputManager.outputDebug(() => 'msg')
      expect(outputManager.queueSize).toBe(1)
    })
  })
})
