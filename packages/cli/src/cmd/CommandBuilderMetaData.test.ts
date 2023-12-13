import { CommandBuilderMetaData } from './CommandBuilderMetaData'
import { Option } from '@commander-js/extra-typings'

describe(CommandBuilderMetaData.name, () => {
  describe('constructor', () => {
    it('should have the expected properties', () => {
      const meta = new CommandBuilderMetaData()
      expect(meta).toHaveProperty('subcommands', [])
      expect(meta).toHaveProperty('globalOptions', [])
      expect(meta).toHaveProperty('hiddenGlobalOptions', new Set<Option>())
      expect(meta).toHaveProperty('presetOptionKeys', [])
      expect(meta).toHaveProperty('argParsers', [])
      expect(meta).toHaveProperty('argValidators', [])
      expect(meta).toHaveProperty('optParsers', {})
      expect(meta).toHaveProperty('optValidators', {})
      expect(meta).toHaveProperty('rawArgs', [])
      expect(meta).toHaveProperty('isNative', false)
    })

    it('actionHandler', () => {
      const meta = new CommandBuilderMetaData()
      expect(meta.actionHandler).toBeInstanceOf(Function)
      expect(meta.actionHandler.name).toBe('defaultActionHandler')
      const custom = () => {}
      Object.defineProperty(meta, 'actionHandler', { value: custom })
      expect(meta.actionHandler).toBe(custom)
    })

    it('errorHandler', () => {
      const meta = new CommandBuilderMetaData()
      expect(meta.errorHandler).toBeInstanceOf(Function)
      expect(meta.errorHandler.name).toBe('defaultErrorHandler')
      const custom = () => {}
      Object.defineProperty(meta, 'errorHandler', { value: custom })
      expect(meta.errorHandler).toBe(custom)
    })

    it('hasCustomActionHandler', () => {
      const meta = new CommandBuilderMetaData()
      expect(meta.hasCustomActionHandler).toBe(false)
      const custom = () => {}
      Object.defineProperty(meta, 'actionHandler', { value: custom })
      expect(meta.hasCustomActionHandler).toBe(true)
    })

    it('hasCustomErrorHandler', () => {
      const meta = new CommandBuilderMetaData()
      expect(meta.hasCustomErrorHandler).toBe(false)
      const custom = () => {}
      Object.defineProperty(meta, 'errorHandler', { value: custom })
      expect(meta.hasCustomErrorHandler).toBe(true)
    })
  })
})
