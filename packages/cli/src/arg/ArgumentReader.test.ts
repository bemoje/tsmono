import { ArgumentBuilder } from './ArgumentBuilder'
import { ArgumentReader } from './ArgumentReader'
import { CommandBuilder } from '../cmd/CommandBuilder'

describe(ArgumentReader.name, () => {
  it('should return an ArgumentReader instance', () => {
    const a = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
    expect(a.get).toBeInstanceOf(ArgumentReader)
  })

  describe('properties', () => {
    let a = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')

    beforeEach(() => {
      a = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
    })

    it('$', () => {
      expect(a.get.$).toBe(a.$)
    })

    it('argument', () => {
      expect(a.get.argument).toBe(a.$)
    })

    it('name', () => {
      const spy = jest.spyOn(a.$, 'name')
      expect(spy).not.toHaveBeenCalled()
      a.get.name
      expect(spy).toHaveBeenCalled()
    })

    it('choices', () => {
      a.choices(['a'])
      expect(a.get.choices).toEqual(a.$.argChoices)
    })

    it('default', () => {
      a.default('a')
      expect(a.get.default).toBe(a.$.defaultValue)
    })

    it('description', () => {
      a.description('a')
      expect(a.get.description).toBe(a.$.description)
    })

    it('variadic', () => {
      expect(a.get.variadic).toBe(a.$.variadic)
    })

    it('required', () => {
      expect(a.get.required).toBe(a.$.required)
    })

    it('optional', () => {
      expect(a.get.optional).toBe(!a.$.required)
    })
  })
})
