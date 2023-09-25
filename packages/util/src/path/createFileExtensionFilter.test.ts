import { createFileExtensionFilter } from './createFileExtensionFilter'

describe('createFileExtensionFilter', () => {
  const paths = ['./src/file', './src/file.js', './src/file.ts', './src/file.md', './src/file.json']
  it('creates filter that accepts any extension', () => {
    const filter = createFileExtensionFilter([])
    expect(paths.filter(filter)).toStrictEqual(paths)
  })
  it('creates filter that accepts one extension', () => {
    const filter = createFileExtensionFilter(['.js'])
    expect(paths.filter(filter)).toStrictEqual(['./src/file.js'])
  })
  it('creates filter that accepts multiple extensions', () => {
    const filter = createFileExtensionFilter(['.js', 'md'])
    expect(paths.filter(filter)).toStrictEqual(['./src/file.js', './src/file.md'])
  })
})
