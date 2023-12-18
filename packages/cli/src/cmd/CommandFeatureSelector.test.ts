import { CommandBuilder } from './CommandBuilder'
import { CommandFeatureSelector } from './CommandFeatureSelector'

describe(CommandFeatureSelector.name, () => {
  let c: CommandBuilder
  let f: CommandFeatureSelector

  beforeEach(() => {
    c = new CommandBuilder('t')
    f = new CommandFeatureSelector(c)
  })

  describe('constructor', () => {
    it('should create a new instance', () => {
      expect(f).toBeInstanceOf(CommandFeatureSelector)
    })

    it('should set default property values', () => {
      expect(f.isAppDataEnabled).toBe(false)
      expect(f.isConfigEnabled).toBe(false)
      expect(f.isPresetsEnabled).toBe(false)
      expect(f.isAutoAssignMissingOptionFlagsEnabled).toBe(false)
      expect(f.isAutoAssignSubCommandAliasesEnabled).toBe(false)
    })
  })

  describe('inheritFrom', () => {
    it('should inherit feature settings from parentFeatures', () => {
      const parentFeatures = new CommandFeatureSelector(c)
      parentFeatures.isAutoAssignMissingOptionFlagsEnabled = true
      parentFeatures.isAutoAssignSubCommandAliasesEnabled = true
      parentFeatures.isPresetsEnabled = true
      f.inheritFrom(parentFeatures)
      expect(f.isAutoAssignMissingOptionFlagsEnabled).toBe(true)
      expect(f.isAutoAssignSubCommandAliasesEnabled).toBe(true)
      expect(f.isPresetsEnabled).toBe(true)
    })
  })

  describe('appData', () => {
    it('should enable the app data feature', () => {
      f.appData()
      expect(f.isAppDataEnabled).toBe(true)
    })

    it('should disable the app data feature', () => {
      f.isAppDataEnabled = true
      f.appData(false)
      expect(f.isAppDataEnabled).toBe(false)
    })

    it('should not modify the app data feature if the value is same as current', () => {
      f.isAppDataEnabled = true
      f.appData(true)
      expect(f.isAppDataEnabled).toBe(true)
    })

    it('should throw an error if the command is native', () => {
      c.meta.isNative = true
      expect(() => {
        f.appData()
      }).toThrowError('Cannot configure appData for native command.')
    })

    it('should output a debug message', () => {
      const spy = jest.spyOn(c, 'outputDebugMessage').mockImplementation(() => {})
      f.appData()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('config', () => {
    it('should enable the config feature', () => {
      f.config()
      expect(f.isConfigEnabled).toBe(true)
    })

    it('should disable the config feature', () => {
      f.isConfigEnabled = true
      f.config(false)
      expect(f.isConfigEnabled).toBe(false)
    })

    it('should not modify the config feature if the value is same as current', () => {
      f.isConfigEnabled = true
      f.config(true)
      expect(f.isConfigEnabled).toBe(true)
    })

    it('should throw an error if the command is native', () => {
      c.meta.isNative = true
      expect(() => {
        f.config()
      }).toThrowError('Cannot configure config for native command.')
    })

    it('should output a debug message', () => {
      const spy = jest.spyOn(c, 'outputDebugMessage').mockImplementation(() => {})
      f.config()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('presets', () => {
    it('should enable the presets feature', () => {
      f.presets()
      expect(f.isPresetsEnabled).toBe(true)
    })

    it('should disable the presets feature', () => {
      f.isPresetsEnabled = true
      f.presets(false)
      expect(f.isPresetsEnabled).toBe(false)
    })

    it('should not modify the presets feature if the value is same as current', () => {
      f.isPresetsEnabled = true
      f.presets(true)
      expect(f.isPresetsEnabled).toBe(true)
    })

    it('should throw an error if the command is native', () => {
      c.meta.isNative = true
      expect(() => {
        f.presets()
      }).toThrowError('Cannot configure presets for native command.')
    })

    it('should output a debug message', () => {
      const spy = jest.spyOn(c, 'outputDebugMessage').mockImplementation(() => {})
      f.presets()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('autoAssignMissingOptionFlags', () => {
    it('should enable the auto assign missing option flags feature', () => {
      f.autoAssignMissingOptionFlags()
      expect(f.isAutoAssignMissingOptionFlagsEnabled).toBe(true)
    })

    it('should disable the auto assign missing option flags feature', () => {
      f.isAutoAssignMissingOptionFlagsEnabled = true
      f.autoAssignMissingOptionFlags(false)
      expect(f.isAutoAssignMissingOptionFlagsEnabled).toBe(false)
    })

    it('should not modify the auto assign missing option flags feature if the value is same as current', () => {
      f.isAutoAssignMissingOptionFlagsEnabled = true
      f.autoAssignMissingOptionFlags(true)
      expect(f.isAutoAssignMissingOptionFlagsEnabled).toBe(true)
    })

    it('should output a debug message', () => {
      const spy = jest.spyOn(c, 'outputDebugMessage').mockImplementation(() => {})
      f.autoAssignMissingOptionFlags()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('autoAssignSubCommandAliases', () => {
    it('should enable the auto assign sub command aliases feature', () => {
      f.autoAssignSubCommandAliases()
      expect(f.isAutoAssignSubCommandAliasesEnabled).toBe(true)
    })

    it('should disable the auto assign sub command aliases feature', () => {
      f.isAutoAssignSubCommandAliasesEnabled = true
      f.autoAssignSubCommandAliases(false)
      expect(f.isAutoAssignSubCommandAliasesEnabled).toBe(false)
    })

    it('should not modify the auto assign sub command aliases feature if the value is same as current', () => {
      f.isAutoAssignSubCommandAliasesEnabled = true
      f.autoAssignSubCommandAliases(true)
      expect(f.isAutoAssignSubCommandAliasesEnabled).toBe(true)
    })

    it('should output a debug message', () => {
      const spy = jest.spyOn(c, 'outputDebugMessage').mockImplementation(() => {})
      f.autoAssignSubCommandAliases()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
