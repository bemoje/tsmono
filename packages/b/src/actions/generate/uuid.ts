import { CLI } from '@bemoje/cli'
import { Encoding } from 'crypto'
import { UUID } from '@bemoje/util'

export default CLI('uuid', (c) => {
  c.version('0.0.1')
  c.$.alias('u')
  c.enableBuiltinOptions({ debug: true, disableStderr: true, disableStdout: true })
  c.autoAssignMissingOptionFlags()
  c.autoAssignSubCommandAliases()
  c.presetsEnabled()
  c.description(
    'Generates a UUID (Universally Unique Identifier) as a string.',
    `  This does not follow the ISO standards. It's just a random string with the first 32 bits being an encoded timestamp and the remaining bits being random bits.`,
    '  https://en.wikipedia.org/wiki/Universally_unique_identifier'
  )
  c.argument('[encoding]', (a) => {
    a.description(`The encoding to use for the output string.`)
    a.choices('base64,base64url,hex,binary,utf8,utf-8,utf16le,latin1,ascii,binary,ucs2,ucs-2'.split(','))
    a.default('binary')
  })
  c.argument('[bits]', (a) => {
    a.description('The number of bits to generate. Minimum is 32 as this only covers the timestamp-part of the UUID.')
    a.parser.integer()
    a.validator.isInteger()
    a.validator.custom((bits: number) => bits >= 32)
    a.default(128, 'The standard for UUIDs is 128 bits.')
  })
  c.action((bits: number, encoding: Encoding) => {
    console.log(UUID(bits, encoding))
  })
})
