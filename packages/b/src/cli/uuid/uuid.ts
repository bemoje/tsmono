import { CLI } from '@bemoje/cli'
import { Encoding } from 'crypto'
import { UUID } from '@bemoje/util'

export default CLI('uuid', (c) => {
  c.version('0.0.1')
  c.alias('u')
  c.description(
    'Generate a UUID string (Universally Unique Identifier).',
    `  This does not follow the ISO standard exactly, but almost. It's just a random string with the first 32 bits being an encoded timestamp and the remaining bits being random bits.`,
    '  https://en.wikipedia.org/wiki/Universally_unique_identifier'
  )
  c.argument('[bits]', (a) => {
    a.description('The number of bits to generate. Minimum is 32 as this only covers the timestamp-part of the UUID.')
    a.parser.integer()
    a.validator.isInteger()
    a.validator.custom((bits: number) => bits >= 32)
    a.default(128, 'The standard for UUIDs is 128 bits.')
  })
  c.option('-e, -encoding <encoding>', (o) => {
    o.description(`The encoding to use for the output string.`)
    o.choices('base64,base64url,hex,binary,utf8,utf-8,utf16le,latin1,ascii,binary,ucs2,ucs-2'.split(','))
    o.default('hex')
  })
  c.action((bits: number, opts: { encoding: Encoding }) => {
    console.log(UUID(bits, opts.encoding))
  })
  c.presetsEnabled()
})
