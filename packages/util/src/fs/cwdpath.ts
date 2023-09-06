import path from 'path'

/**
 * Joins the given path segments to the current working directory path, and normalizes the resulting path.
 * @remarks
 * The function uses the `path.join` method from the Node.js `path` module, and the `process.cwd` method from the Node.js `process` module.
 * @param paths - The path segments to join to the current working directory path.
 * @returns The resulting path.
 * @example ```ts
 * console.log(cwdpath('src', 'index.ts'));
 * //=> '{working_directory}/src/index.ts'
 * ```
 */
export function cwdpath(...paths: string[]): string {
  return path.join(process.cwd(), ...paths)
}
