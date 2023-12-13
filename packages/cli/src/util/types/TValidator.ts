import type { Any } from './Any'

export type TValidator<T = Any> = (value: T) => boolean
