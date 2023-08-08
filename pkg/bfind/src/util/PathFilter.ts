import { regexEscapeString } from '@bemoje/node-util'
import { EventEmitter } from 'events'
import path from 'path'

export interface IIgnoreOptions {
  startsWith?: boolean
  endsWith?: boolean
}

/**
 * Builder class to easily and flexibly construct and implement filesystem path filtering.
 */
export class PathFilter extends EventEmitter {
  /**
   * Returns a new object with the default ignore options.
   */
  protected static get ignoreOptionDefaults(): IIgnoreOptions {
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

  isCaseInsensitive = process.platform === 'win32'

  constructor(options?: { captureRejections?: boolean }) {
    super(options)
  }

  protected handleOptions(escaped: string, options?: IIgnoreOptions) {
    if (!options) return escaped
    if (options.startsWith) escaped = '^' + escaped
    if (options.endsWith) escaped = escaped + '$'
    return escaped
  }

  /**
   * Add a whole or partial filepath to ignore.
   */
  public ignoreFilepath(ignore: string, options?: IIgnoreOptions): PathFilter {
    options = Object.assign(PathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.filepathRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a whole or partial dirname to ignore.
   */
  public ignoreDirpath(ignore: string, options?: IIgnoreOptions): PathFilter {
    options = Object.assign(PathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.dirpathRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    // console.log(this.dirpathRegex[this.dirpathRegex.length - 1])
    return this
  }

  /**
   * Add a whole or partial filename to ignore.
   */
  public ignoreFilename(ignore: string, options?: IIgnoreOptions): PathFilter {
    options = Object.assign(PathFilter.ignoreOptionDefaults, options)
    ignore = ignore.replace(/(\\|\/)+/g, path.sep)
    if (this.isCaseInsensitive) ignore = ignore.toLowerCase()
    const escaped = this.handleOptions(regexEscapeString(ignore), options)
    this.filenameRegex.push(new RegExp(escaped, this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a file extension type to ignore.
   */
  public ignoreExtension(ignore: string): PathFilter {
    ignore = ignore.toLowerCase()
    if (!ignore.startsWith('.')) ignore = '.' + ignore
    const escaped = regexEscapeString(ignore)
    this.filenameRegex.push(new RegExp(escaped + '$', this.isCaseInsensitive ? 'i' : ''))
    return this
  }

  /**
   * Add a custom filter function for validating filepaths
   */
  public filterFilepath(filter: (path: string) => boolean): PathFilter {
    this.filepathFilters.push(filter)
    return this
  }

  /**
   * Add a custom filter function for validating dirpaths.
   */
  public filterDirpath(filter: (path: string) => boolean): PathFilter {
    this.dirpathFilters.push(filter)
    return this
  }

  /**
   * Add a custom filter function for validating filenames.
   */
  public filterFilename(filter: (path: string) => boolean): PathFilter {
    this.filenameFilters.push(filter)
    return this
  }

  /**
   * Add a custom regex object for matching filepaths to be ignored.
   */
  public ignoreFilepathRegex(regex: RegExp): PathFilter {
    this.filepathRegex.push(regex)
    return this
  }

  /**
   * Add a custom regex object for matching dirpaths to be ignored.
   */
  public ignoreDirpathRegex(regex: RegExp): PathFilter {
    this.dirpathRegex.push(regex)
    return this
  }

  /**
   * Add a custom regex object for matching filenames to be ignored.
   */
  public ignoreFilenameRegex(regex: RegExp): PathFilter {
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
