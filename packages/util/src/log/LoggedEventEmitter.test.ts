import { AbstractErrorEvent, AbstractEvent, LoggedEventEmitter, TLoggedEventListener } from './LoggedEventEmitter'
import { LogLevel } from './types/LogLevel'

describe(LoggedEventEmitter.name, () => {
  describe('constructor', () => {
    it('should create a new LoggedEventEmitter instance', () => {
      const emitter = new LoggedEventEmitter('type')
      expect(emitter).toBeInstanceOf(LoggedEventEmitter)
    })

    it('should set the EventClass and ErrorEventClass properties', () => {
      const emitter = new LoggedEventEmitter('type')
      expect(emitter['EventClass']).toBeDefined()
      expect(emitter['ErrorEventClass']).toBeDefined()
    })
  })

  describe('emit', () => {
    it('should emit an event with the provided data', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.on('test', listener)
      emitter.emit('test', 'data')
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ event: 'test', data: 'data' }))
    })

    it('should emit an error event with the provided error', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.on('error', listener)
      emitter.emitError(new Error('test error'))
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ event: 'error' }))
    })

    it('should emit an event with the provided data to global listeners', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      LoggedEventEmitter.GLOBAL_EVENTS.on(LogLevel.INFO, listener)
      emitter.emit('info', 'data')
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ event: 'info' }))
    })

    it('should return true if there are listeners for the event', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.on('test', listener)
      const result = emitter.emit('test', 'data')
      expect(result).toBe(true)
    })

    it('should return false if there are no listeners for the event', () => {
      const emitter = new LoggedEventEmitter('type')
      const result = emitter.emit('test', 'data')
      expect(result).toBe(false)
    })
  })

  describe('on', () => {
    it('should add the listener to the listeners array', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.on('test', listener)
      expect(emitter.listeners('test')).toContain(listener)
    })
  })

  describe('once', () => {
    it('should add the listener to the listeners array', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.once('test', listener)
      expect(emitter.listeners('test')).toContain(listener)
    })

    it('should remove the listener after it has been called', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.once('test', listener)
      emitter.emit('test', 'data')
      expect(emitter.listeners('test')).not.toContain(listener)
    })
  })

  describe('addListener', () => {
    it('should add the listener to the listeners array', () => {
      const emitter = new LoggedEventEmitter('type')
      const listener: TLoggedEventListener = jest.fn()
      emitter.addListener('test', listener)
      expect(emitter.listeners('test')).toContain(listener)
    })
  })
})

describe('AbstractEvent', () => {
  class Extension extends AbstractEvent {
    get parent(): LoggedEventEmitter {
      return new LoggedEventEmitter()
    }
    get type(): string {
      return 'LoggedEventEmitter'
    }
  }

  describe('constructor', () => {
    it('should create a new AbstractEvent instance', () => {
      const event = new Extension('test')
      expect(event).toBeInstanceOf(AbstractEvent)
    })

    it('should set the event property', () => {
      const event = new Extension('test')
      expect(event.event).toBe('test')
    })

    it('should set the data property', () => {
      const event = new Extension('test', 'data')
      expect(event.data).toBe('data')
    })
  })

  describe('toJSON', () => {
    it('should return a JSON representation of the event', () => {
      const event = new Extension('test', 'data')
      expect(JSON.stringify(event)).toBe(JSON.stringify(event.toJSON()))
    })
  })
})

describe('AbstractErrorEvent', () => {
  class Extension extends AbstractErrorEvent {
    get parent(): LoggedEventEmitter {
      return new LoggedEventEmitter()
    }
    get type(): string {
      return 'LoggedEventEmitter'
    }
  }

  describe('constructor', () => {
    it('should create a new AbstractErrorEvent instance', () => {
      const event = new Extension('test')
      expect(event).toBeInstanceOf(AbstractErrorEvent)
    })
  })

  describe('toJSON', () => {
    it('should return a JSON representation of the error event', () => {
      const event = new Extension('test')
      expect(JSON.stringify(event)).toBe(JSON.stringify(event.toJSON()))
    })
  })
})
