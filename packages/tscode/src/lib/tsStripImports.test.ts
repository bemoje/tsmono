import { tsStripImports } from './tsStripImports'

describe('tsStripImports', () => {
  it('should remove single line import statements', () => {
    const code = [
      "import { Component } from 'react';",
      "import { connect } from 'react-redux';",
      '',
      'export function thing() {',
      '  return',
      '}',
    ].join('\n')

    const expected = [
      'export function thing() {',
      '  return',
      '}',
      //
    ].join('\n')

    expect(tsStripImports(code)).toEqual(expected)
  })

  it('should remove multiline import statements', () => {
    const code = [
      "import { join } from 'path'",
      'import {',
      '  Component,',
      '  useState,',
      '  useEffect,',
      '  //',
      "} from 'react'",
      '',
      "import { dirname } from 'path'",
      '',
      'function thing() {',
      '  return',
      '}',
    ].join('\n')

    const expected = [
      'function thing() {',
      '  return',
      '}',
      //
    ].join('\n')

    expect(tsStripImports(code)).toEqual(expected)
  })

  it('Should trim any empty lines left after removing import lines.', () => {
    const code = [
      '',
      "import { join } from 'path'",
      '',
      '',
      'const a = 1',
      //
    ].join('\n')

    const expected = [
      'const a = 1',
      //
    ].join('\n')

    expect(tsStripImports(code)).toEqual(expected)
  })

  it('should handle empty code', () => {
    const code = ''
    const expected = ''
    expect(tsStripImports(code)).toEqual(expected)
  })
})
