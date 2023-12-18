import { CommandBuilder } from './CommandBuilder'
import { DefaultHelpConfig } from './DefaultHelpConfig'

describe('DefaultHelpConfig', () => {
  it('should be a partial Help object', () => {
    CommandBuilder // needs to load first for prototype override
    expect(DefaultHelpConfig).toHaveProperty('helpWidth')
    expect(DefaultHelpConfig).toHaveProperty('showGlobalOptions')
    expect(DefaultHelpConfig).toHaveProperty('sortSubcommands')
    expect(DefaultHelpConfig).toHaveProperty('sortOptions')
    expect(DefaultHelpConfig).toHaveProperty('subcommandTerm')
    expect(DefaultHelpConfig).toHaveProperty('argumentTerm')
    expect(DefaultHelpConfig).toHaveProperty('commandUsage')
    expect(DefaultHelpConfig).toHaveProperty('visibleOptions')
    expect(DefaultHelpConfig).toHaveProperty('visibleGlobalOptions')
    expect(DefaultHelpConfig).toHaveProperty('subcommandDescription')
    expect(DefaultHelpConfig).toHaveProperty('optionDescription')
    expect(DefaultHelpConfig).toHaveProperty('argumentDescription')
    expect(DefaultHelpConfig).toHaveProperty('commandDescription')
    expect(DefaultHelpConfig).toHaveProperty('formatHelp')
  })
})
