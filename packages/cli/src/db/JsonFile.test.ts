import { AppDataSection } from './AppDataSection'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { ConfigSection } from './ConfigSection'
import { JsonDB } from './JsonDB'
import { JsonFile } from './JsonFile'
import { PresetsSection } from './PresetsSection'

describe(JsonFile.name, () => {
  describe('constructor', () => {
    it('should return a JsonFile instance', () => {
      new CommandBuilder('t', (c) => {
        expect(c.db).toBeInstanceOf(JsonFile)
      })
    })
  })

  describe('db', () => {
    it('should return a JsonDB instance', () => {
      new CommandBuilder('t', (c) => {
        expect(c.db.db).toBeInstanceOf(JsonDB)
      })
    })

    it('should return the root commands db if subcommand', () => {
      new CommandBuilder('t', (c) => {
        c.command('sub', (s) => {
          expect(s.db.db).toBe(c.db.db)
        })
      })
    })
  })

  describe('config', () => {
    it('should return a ConfigSection instance', () => {
      new CommandBuilder('t', (c) => {
        expect(c.db.config).toBeInstanceOf(ConfigSection)
      })
    })
  })

  describe('appData', () => {
    it('should return a AppDataSection instance', () => {
      new CommandBuilder('t', (c) => {
        expect(c.db.appData).toBeInstanceOf(AppDataSection)
      })
    })
  })

  describe('presets', () => {
    it('should return a PresetsSection instance', () => {
      new CommandBuilder('t', (c) => {
        expect(c.db.presets).toBeInstanceOf(PresetsSection)
      })
    })
  })
})
