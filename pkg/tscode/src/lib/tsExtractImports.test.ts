import { strTrimLinesLeft } from '@bemoje/string'
import { tsExtractImports } from './tsExtractImports'
import { ITsExtractImportsResult } from './types/ITsExtractImportsResult'

describe(tsExtractImports.name, () => {
  it('should return an empty array for an empty code string', () => {
    const code = ''
    const result = tsExtractImports(code)
    expect(result).toEqual([])
  })

  it('should correctly extract a single import statement without braces', () => {
    const code = "import { module } from 'module';"
    const result: ITsExtractImportsResult[] = [
      {
        start: 0,
        end: 0,
        match: "import { module } from 'module';",
      },
    ]
    expect(tsExtractImports(code)).toEqual(result)
  })

  it('should correctly extract a single import statement with braces', () => {
    const code = "import module from 'module';"
    const result: ITsExtractImportsResult[] = [
      {
        start: 0,
        end: 0,
        match: "import module from 'module';",
      },
    ]
    expect(tsExtractImports(code)).toEqual(result)
  })

  it('should correctly extract multiple import statements', () => {
    const code = strTrimLinesLeft(`
    import { module1 } from 'module1';
    import module2 from 'module2';
    import { module3, module4 } from 'module3';
    `)
    const result: ITsExtractImportsResult[] = [
      {
        start: 1,
        end: 1,
        match: "import { module1 } from 'module1';",
      },
      {
        start: 2,
        end: 2,
        match: "import module2 from 'module2';",
      },
      {
        start: 3,
        end: 3,
        match: "import { module3, module4 } from 'module3';",
      },
    ]
    expect(tsExtractImports(code)).toEqual(result)
  })
})
