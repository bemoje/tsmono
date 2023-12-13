import type { Any } from './Any'

export type TFunctionNoNew<R = Any, A extends Any[] = Any[]> = (...args: A) => R
