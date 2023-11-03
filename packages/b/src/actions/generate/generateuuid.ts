/**
 * Generates a UUID (Universally Unique Identifier) as a string.
 * This does not follow the ISO standards. It's just a random string with the first 32 bits being an encoded timestamp and the remaining bits being random bits.
 * https://en.wikipedia.org/wiki/Universally_unique_identifier
 * @param bits - The number of bits to generate. Minimum is 32 as this only covers the timestamp-part of the UUID.
 * @param encoding - The encoding to use for the output string. Default is 'binary'.
 * @returns A UUID as a string.
 */

import { ICommand, parseInteger, validateInteger } from '@bemoje/commander-config'
import { UUID } from '@bemoje/util'
import { Encoding } from 'crypto'
import { NODEJS_ENCODINGS } from './NODEJS_ENCODINGS'

export const program: ICommand = {
  command: 'b uuid',
  summary: 'Generates a UUID (Universally Unique Identifier) as a string.',
  details: [
    `This does not follow the ISO standards. It's just a random string with the first 32 bits being an encoded timestamp and the remaining bits being random bits. https://en.wikipedia.org/wiki/Universally_unique_identifier`,
  ],
  arguments: [
    {
      name: 'bits',
      description: 'The number of bits to generate. Minimum is 32 as this only covers the timestamp-part of the UUID.',
      isOptional: false,
      isRest: false,
      isCommaDelimited: false,
      default: {
        value: '128',
        description: 'The standard for UUIDs is 128 bits.',
      },
      parser: parseInteger,
      validate: validateInteger,
    },
    {
      name: 'encoding',
      description: `The encoding to use for the output string.`,
      default: {
        value: 'binary',
        description: 'The standard for UUIDs is 128 bits.',
      },
      choices: NODEJS_ENCODINGS,
    },
  ],
  options: [],
  action: (bits: number, encoding: Encoding) => {
    console.log(UUID(bits, encoding))
  },
}

const ooo = {
  type: 'select',
  name: 'encoding',
  message: 'The encoding to use for the output string. Nodejs encodings.',
  validate: 'string',
  initial: 'binary',
  choices: NODEJS_ENCODINGS,
}
