import { execSync } from 'child_process'
import path from 'path'

/**
 * This function retrieves information about the disk drives on a Windows system.
 * It uses the Windows Management Instrumentation (WMI) to query the system for this information.
 *
 * @example
 * getDiskDrivesWindows()
 * //=> [ 'C:\\', 'G:\\' ]
 */
export function getDiskDrivesWindows(): string[] {
  return execSync('wmic logicaldisk get name')
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => /^[a-z]:/i.test(s))
    .map((s) => s.substring(0, 2) + path.sep)
}
