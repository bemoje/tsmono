import { EventEmitter } from 'events'
import path from 'path'
import { isWindows } from '../os/isWindows'
import { regexEscapeString } from '../regex/regexEscapeString'
import { IPathFilterIgnoreOptions } from './IPathFilterIgnoreOptions'

/**
 * Builder class to easily and flexibly construct and implement filesystem path filtering.
 */
export class FSPathFilter extends EventEmitter {
  /**
   * Returns a new object with the default ignore options.
   */
  protected static get ignoreOptionDefaults(): IPathFilterIgnoreOptions {
    return {
      startsWith: false,
      endsWith: false,
    }
  }

  protected filepathFilters: Array<(path: string) => boolean> = []
  protected dirpathFilters: Array<(path: string) => boolean> = []
  protected filenameFilters: Array<(path: string) => boolean> = []

  protected filepathRegex: Array<RegExp> = []
  protected dirpathRegex: Array<RegExp> = []
  protected filenameRegex: Array<RegExp> = []

  isCaseInsensitive = isWindows()

  constructor(options?: { captureRejections?: boolean }) {
    super(options)
  }

  protected handleOptions(escaped: string, options?: IPathFilterIgnoreOptions) {
    if (!options) return escaped
    if (options.startsWith) escaped = '^' + escaped
    if (options.endsWith) escaped = escaped + '$'
    return escaped
  }

  /**
   * Add a whole or partial filepath to ignore.
   */
  public ignoreFilepath(ignore: string, options?: IPathFilterIgnoreOptions): FSPathFilter {
    options = Object.assign(FSPathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.filepathRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a whole or partial dirname to ignore.
   */
  public ignoreDirpath(ignore: string, options?: IPathFilterIgnoreOptions): FSPathFilter {
    options = Object.assign(FSPathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.dirpathRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a whole or partial filename to ignore.
   */
  public ignoreFilename(ignore: string, options?: IPathFilterIgnoreOptions): FSPathFilter {
    options = Object.assign(FSPathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.filenameRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a file extension type to ignore.
   */
  public ignoreExtension(ignore: string): FSPathFilter {
    ignore = ignore.toLowerCase()
    if (!ignore.startsWith('.')) ignore = '.' + ignore
    const escaped = regexEscapeString(ignore)
    this.filenameRegex.push(new RegExp(escaped + '$', this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a custom filter function for validating filepaths
   */
  public filterFilepath(filter: (path: string) => boolean): FSPathFilter {
    this.filepathFilters.push(filter)
    return this
  }

  /**
   * Add a custom filter function for validating dirpaths.
   */
  public filterDirpath(filter: (path: string) => boolean): FSPathFilter {
    this.dirpathFilters.push(filter)
    return this
  }

  /**
   * Add a custom filter function for validating filenames.
   */
  public filterFilename(filter: (path: string) => boolean): FSPathFilter {
    this.filenameFilters.push(filter)
    return this
  }

  /**
   * Add a custom regex object for matching filepaths to be ignored.
   */
  public ignoreFilepathRegex(regex: RegExp): FSPathFilter {
    this.filepathRegex.push(regex)
    return this
  }

  /**
   * Add a custom regex object for matching dirpaths to be ignored.
   */
  public ignoreDirpathRegex(regex: RegExp): FSPathFilter {
    this.dirpathRegex.push(regex)
    return this
  }

  /**
   * Add a custom regex object for matching filenames to be ignored.
   */
  public ignoreFilenameRegex(regex: RegExp): FSPathFilter {
    this.filenameRegex.push(regex)
    return this
  }

  /**
   * Performs the configured filepath filtering.
   */
  public validateFilepath(filepath: string): boolean {
    for (const fn of this.filepathFilters) {
      if (!fn(filepath)) {
        this.emit('invalid', 'filepath', filepath)
        return false
      }
    }
    for (const reg of this.filepathRegex) {
      if (reg.test(filepath)) {
        this.emit('invalid', 'filepath', filepath)
        return false
      }
    }
    return true
  }

  /**
   * Performs the configured dirpath filtering.
   */
  public validateDirpath(dirpath: string): boolean {
    dirpath = dirpath.toLowerCase().replace(/(\\|\/)+/g, path.sep)
    for (const fn of this.dirpathFilters) {
      if (!fn(dirpath)) {
        this.emit('invalid', 'dirpath', dirpath)
        return false
      }
    }
    for (const reg of this.dirpathRegex) {
      if (reg.test(dirpath)) {
        this.emit('invalid', 'dirpath', dirpath)
        return false
      }
    }
    return true
  }

  /**
   * Performs the configured filename filtering.
   */
  public validateFilename(filename: string): boolean {
    for (const fn of this.filenameFilters) {
      if (!fn(filename)) {
        this.emit('invalid', 'filename', filename)
        return false
      }
    }
    for (const reg of this.filenameRegex) {
      if (reg.test(filename)) {
        this.emit('invalid', 'filename', filename)
        return false
      }
    }
    return true
  }
}
