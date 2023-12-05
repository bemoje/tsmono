import { Option } from 'commander'
import { setOptionLongName } from './setOptionLongName'

describe(setOptionLongName.name, () => {
  describe('when long name not initially provided', () => {
    describe('short property', () => {
      it('should set the long property', () => {
        const opt = new Option('-a')
        setOptionLongName(opt, '--alpha')
        expect(opt.long).toBe('--alpha')
      })

      it('should set the long property with dash prefix even if not provided', () => {
        const opt = new Option('-a')
        setOptionLongName(opt, 'alpha')
        expect(opt.long).toBe('--alpha')
      })

      it('should set the long property with too many dashes', () => {
        const opt = new Option('-a')
        setOptionLongName(opt, '---alpha')
        expect(opt.long).toBe('--alpha')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-a')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property no flags provided', () => {
        const opt = new Option('')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('--alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-a <arg>')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })

      it('should set the flags property when there is a variadic option argument', () => {
        const opt = new Option('-a <arg...>')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg...>')
      })
    })
  })

  describe('when long name initially provided', () => {
    describe('short property', () => {
      it('should set the long property', () => {
        const opt = new Option('-a, --beta')
        setOptionLongName(opt, '--alpha')
        expect(opt.long).toBe('--alpha')
      })
    })

    describe('flags property', () => {
      it('should set the flags property', () => {
        const opt = new Option('-a, --beta')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha')
      })

      it('should set the flags property when there is an option argument', () => {
        const opt = new Option('-a, --beta <arg>')
        setOptionLongName(opt, '--alpha')
        expect(opt.flags).toBe('-a, --alpha <arg>')
      })
    })
  })
})
