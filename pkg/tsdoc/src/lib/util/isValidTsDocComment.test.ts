import { isValidTsDocComment } from './isValidTsDocComment'

describe(isValidTsDocComment.name, () => {
  it('should return false if the code is empty', () => {
    expect(isValidTsDocComment('')).toBe(false)
  })

  it('should return false if the code does not start with "/**"', () => {
    expect(isValidTsDocComment('/* Comment */')).toBe(false)
  })

  it('should return false if the block is less than two lines long.', () => {
    expect(isValidTsDocComment('/** Commwnr */')).toBe(false)
  })

  it('should return false if lines have unexpected characters on the left side.', () => {
    expect(isValidTsDocComment('/**\na * Comment\n */')).toBe(false)
  })

  it('should return false if the last line is something other than */.', () => {
    expect(isValidTsDocComment('/**\n * Comment\n *-')).toBe(false)
  })

  it('should return false if the first line is something other than /**.', () => {
    expect(isValidTsDocComment('/*-\n * Comment\n */')).toBe(false)
  })

  it('should return false if something is on the right side in either end.', () => {
    expect(isValidTsDocComment('/** text\n * Comment\n */')).toBe(false)
    expect(isValidTsDocComment('/**\n * Comment\n */ text')).toBe(false)
  })

  it('Empty two line block is allowed */.', () => {
    expect(isValidTsDocComment('/**\n */')).toBe(true)
  })

  it('should return false if the code does not end with "*/"', () => {
    expect(isValidTsDocComment('/** Comment')).toBe(false)
  })

  it('should return false if any line not at the ends does not start with "*"', () => {
    expect(isValidTsDocComment('/**\n Comment\n*/')).toBe(false)
  })

  it('should return true if the code is a valid TSDoc comment', () => {
    expect(isValidTsDocComment('/**\n * Comment\n */')).toBe(true)
  })

  it('It is allowed to have leading and trailing whitespace.', () => {
    expect(isValidTsDocComment('  \n\t   /**\n * Comment\n */   \n  ')).toBe(true)
  })

  it('It is allowed to have as many leading spaces or tabs on the left side of * as wanted.', () => {
    expect(
      isValidTsDocComment(
        [
          '      /**',
          '       * Comment1',
          ' \t    * Comment2',
          '       */',
          //
        ].join('\n'),
      ),
    ).toBe(true)
  })
})
