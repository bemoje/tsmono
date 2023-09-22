import { validateDirpath } from './validateDirpath'

export function validateDirpaths(name: string, dirpaths: string[]): void {
  dirpaths.forEach((dirpath) => validateDirpath(name, dirpath))
}
