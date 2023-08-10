/**
 * Converts an array of time values into a string representation.
 * The array should contain four numbers representing hours, minutes, seconds, and milliseconds respectively.
 * The function does not perform any safety checks on the input array.
 * @param array - An array of four numbers representing hours, minutes, seconds, and milliseconds.
 * @param msDelimiter - A string to be used as the delimiter between seconds and milliseconds. Defaults to '.'.
 * @returns A string representation of the time.
 * @example ```ts
 * const timeArray = [13, 15, 45, 123];
 * const result = timeArrayToStringUnsafe(timeArray, ':');
 * console.log(result); // Outputs: "13:15:45:123"
 * ```
 */
export function timeArrayToStringUnsafe(array: number[], msDelimiter = '.'): string {
  const hr = array[0].toString().padStart(2, '0')
  const min = array[1].toString().padStart(2, '0')
  const sec = array[2].toString().padStart(2, '0')
  const ms = array[3].toString().padStart(3, '0')
  return `${hr}:${min}:${sec}${msDelimiter}${ms}`
}
