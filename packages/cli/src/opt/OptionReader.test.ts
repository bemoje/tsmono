import { CommandBuilder } from '../cmd/CommandBuilder'
import { OptionBuilder } from './OptionBuilder'
import { OptionHelpers } from './OptionHelpers'
import { OptionReader } from './OptionReader'

describe(OptionReader.name, () => {
  it('should return an OptionReader instance', () => {
    const o = new OptionBuilder(new CommandBuilder('t'), '-a, --alpha <arg>')
    expect(o.get).toBeInstanceOf(OptionReader)
  })

  describe('properties', () => {
    let o = new OptionBuilder(new CommandBuilder('t'), '-a, --alpha <arg>')

    beforeEach(() => {
      o = new OptionBuilder(new CommandBuilder('t'), '-a, --alpha <arg>')
    })

    it('$', () => {
      expect(o.get.$).toBe(o.$)
    })

    it('option', () => {
      expect(o.get.option).toBe(o.$)
    })

    it('description', () => {
      o.description('a')
      expect(o.get.description).toBe(o.$.description)
    })

    it('optional', () => {
      expect(o.get.optional).toBe(o.$.optional)
    })

    it('mandatory', () => {
      expect(o.get.mandatory).toBe(o.$.mandatory)
    })

    it('hidden', () => {
      expect(o.get.hidden).toBe(o.$.hidden)
    })

    it('variadic', () => {
      expect(o.get.variadic).toBe(o.$.variadic)
    })

    it('mandatory', () => {
      expect(o.get.mandatory).toBe(o.$.mandatory)
    })

    it('short', () => {
      expect(o.get.short).toBe(o.$.short)
    })

    it('long', () => {
      expect(o.get.long).toBe(o.$.long)
    })

    it('preset', () => {
      expect(o.get.preset).toBe(o.$.presetArg)
    })

    it('default', () => {
      expect(o.get.default).toBe(o.$.defaultValue)
    })

    it('choices', () => {
      o.choices(['a'])
      expect(o.get.choices).toEqual(o.$.argChoices)
    })

    it('env', () => {
      expect(o.get.env).toBe(o.$.envVar)
    })

    it('flags', () => {
      expect(o.get.flags).toBe(o.$.flags)
    })

    it('hasArgument', () => {
      const spy = jest.spyOn(OptionHelpers, 'hasArgument')
      expect(spy).not.toHaveBeenCalled()
      o.get.hasArgument
      expect(spy).toHaveBeenCalled()
    })

    it('name', () => {
      const spy = jest.spyOn(o.$, 'name')
      expect(spy).not.toHaveBeenCalled()
      o.get.name
      expect(spy).toHaveBeenCalled()
    })

    it('attributeName', () => {
      const spy = jest.spyOn(o.$, 'attributeName')
      expect(spy).not.toHaveBeenCalled()
      o.get.attributeName
      expect(spy).toHaveBeenCalled()
    })

    it('defaultValueDescription', () => {
      expect(o.get.defaultValueDescription).toBe(o.$.defaultValueDescription)
    })
  })
})
