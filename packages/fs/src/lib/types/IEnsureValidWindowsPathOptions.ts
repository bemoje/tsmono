export interface IEnsureValidWindowsPathOptions {
  /**
   * On most versions of windows, the max allowed length of paths has been raised.
   */
  extendedMaxLength?: boolean
  /**
   * Throw if not valid, otherwise return false.
   */
  assert?: boolean
}
