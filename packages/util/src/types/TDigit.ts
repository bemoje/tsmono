import { TChar } from './TChar'

/**
 * A type representing a digit between 0 and 9.
 */
export type TDigitGeneric<T extends string> = T extends TDigit ? TChar<T> : never

/**
 * A type representing a digit between 0 and 9.
 */
export type TDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
