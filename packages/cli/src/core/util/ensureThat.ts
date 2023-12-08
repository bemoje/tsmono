import { Any, TConstructor } from '@bemoje/util'

export function ensureThat<T>(
  value: T,
  validator: ((value: T, ...args: any[]) => boolean | string) | ((value: T, ...args: any[]) => boolean),
  options: { Err?: TConstructor; args?: Any[] } = {}
): T {
  const result = validator(value, ...(options.args ?? []))
  if (result === true) return value
  const message =
    typeof result === 'string' ? `${result}. Got: ${value}` : `Expected '${validator.name}'. Got: ${value}`
  throw new (options.Err ?? Error)(message)
}
