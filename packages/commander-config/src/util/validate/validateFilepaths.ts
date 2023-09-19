import { validateFilepath } from './validateFilepath'

export function validateFilepaths(name: string, filepaths: string[]): void {
  filepaths.forEach((filepath) => validateFilepath(name, filepath))
}
