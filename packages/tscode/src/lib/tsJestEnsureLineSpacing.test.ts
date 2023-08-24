import { tsJestEnsureLineSpacing } from './tsJestEnsureLineSpacing'

describe(tsJestEnsureLineSpacing.name, () => {
  it('should ensure all empty lines removed except for line spacing between tests', () => {
    const input = [
      "describe('mapGetOrElse', () => {",
      "  it('should', () => {",
      '    //',
      '',
      '    //',
      '  })',
      '',
      '',
      "  it('should', () => {",
      '    //',
      '  })',
      "  it('should', () => {",
      '    //',
      '  })',
      '',
      "  it('should', () => {",
      '    //',
      '  })',
      '',

      '})',
    ].join('\n')

    expect(tsJestEnsureLineSpacing(input).trim()).toEqual(
      [
        "describe('mapGetOrElse', () => {",
        '',
        "  it('should', () => {",
        '    //',
        '    //',
        '  })',
        '',
        "  it('should', () => {",
        '    //',
        '  })',
        '',
        "  it('should', () => {",
        '    //',
        '  })',
        '',
        "  it('should', () => {",
        '    //',
        '  })',
        '})',
      ].join('\n'),
    )
  })
})
