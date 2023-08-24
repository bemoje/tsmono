import { MemoryUsageResult } from './types/MemoryUsageResult'

/**
 * @returns An object with the following properties:
 * - `processAllocationMB`: The amount of memory that Node.js has obtained from the system.
 * - `heapAllocationMB`: The amount of memory V8 has allocated for the heap. This is just the memory used by the heap itself, not including the memory used by the objects it contains.
 * - `heapUsedMB`: The amount of memory used by application data on the V8 heap.
 * - `extenalV8`: The amount of memory used by C++ objects bound to JavaScript objects managed by V8.
 * Returns an object about the process memory usage for: process allocation, heap allocation, heap, v8.
 * @example ```ts
 * memoryUsage().processAllocationMB;;
 * //=> {result in MB}
 * memoryUsage().heapAllocationMB;;
 * //=> {result in MB}
 * memoryUsage().heapUsedMB;;
 * //=> {result in MB}
 * memoryUsage().extenalV8;;
 * //=> {result in MB}
 * ```
 */
export function memoryUsage(): MemoryUsageResult {
  const toIntMB = (n: number) => Math.floor(n * 0.000001)
  const data = process.memoryUsage()
  return {
    processAllocationMB: toIntMB(data.rss),
    heapAllocationMB: toIntMB(data.heapTotal),
    heapUsedMB: toIntMB(data.heapUsed),
    extenalV8: toIntMB(data.external),
  }
}
