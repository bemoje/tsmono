// export type MappedTypeWithNewProperties<T> = {
//   [K in keyof T]: T[K]
// }

import { CommandBuilder } from './CommandBuilder'

export type ReturnTypesOfFunctionArray<Arr extends ((...args: any[]) => unknown)[]> = {
  [I in keyof Arr]: Arr[I] extends never | undefined ? string : ReturnType<Arr[I]>
}

export type ReturnTypesOfFunctionMap<O extends Record<string, (...args: any[]) => unknown>> = {
  [K in keyof O]: O[K] extends never | undefined ? string : ReturnType<O[K]>
}

const args = [() => 1, () => '1', () => true]
const opts = { a: () => 1, b: () => '1', c: () => true }

type TArgs = ReturnTypesOfFunctionArray<typeof args>

type TOpts = ReturnTypesOfFunctionMap<typeof opts>

const cli = new CommandBuilder('test', (c) => {
  c.argument('[int]', (a) => {
    a.parser.integer()
  })
  c.argument('[str]', (a) => {
    a.parser.string()
  })
  c.option('--opt1 <value>', (o) => {
    o.parser.string()
  })
  c.option('--opt1 <value>', (o) => {
    o.parser.integer()
  })
  c.action((int, str, opts) => {
    const parsers = cli.meta.argParsers
    type Arrr = ReturnTypesOfFunctionArray<typeof parsers>
    console.log({ int, str, opts })
  })
})
