import { parseSocialSecurityNumberDK } from './parseSocialSecurityNumberDK'

/**
 * Checks if the given string is a valid Danish Social Security Number (SSN).
 * @remarks This function uses the `parseSocialSecurityNumberDK` function to validate the SSN.
 * @param ssn The string to be checked.
 * @returns A boolean indicating whether the string is a valid Danish SSN.
 * @throws Will throw an error if the `parseSocialSecurityNumberDK` function throws an error.
 * @example ```ts
 * isSocialSecurityNumberDK('123456-7890');;
 * //=> true
 * isSocialSecurityNumberDK('123456-789');;
 * //=> false
 * ```
 */
export function isSocialSecurityNumberDK(ssn: string): boolean {
  return !!parseSocialSecurityNumberDK(ssn)
}
