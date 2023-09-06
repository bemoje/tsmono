/**
 * Converts an array of time values into an integer.
 * The array should contain four elements representing hours, minutes, seconds, and milliseconds respectively.
 * This function does not perform any safety checks, so it's up to the caller to ensure the input is valid.
 * @remarks This function does not perform any safety checks, so it's up to the caller to ensure the input is valid.
 * @param array - An array of four numbers representing hours, minutes, seconds, and milliseconds.
 * @returns The time represented as an integer in milliseconds.
 * @throws This function does not throw any exceptions.
 * @example ```ts
 * const time = [1, 30, 45, 500]; // 1 hour, 30 minutes, 45 seconds, and 500 milliseconds
 * const result = timeArrayToIntUnsafe(time);
 * console.log(result); // Outputs: 5445500
 * ```
 */
export function timeArrayToIntUnsafe(array: number[]): number {
  const [hr, min, sec, ms] = array
  const int = hr * 3600000 + min * 60000 + sec * 1000 + ms
  return int
}
