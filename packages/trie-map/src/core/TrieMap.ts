import { Any } from '@bemoje/util'

const SENTINEL = String.fromCharCode(0)

/**
 * Class for a fast trie map.
 */
export class TrieMap<T> {
  /**
   * Creates a new instance from existing data.
   * @param json - A JSON-string (a previously stringified TrieMap instance).
   * @example
   * ```js
   * const json = new TrieMap()
   *   .set(['some', 'path'], 'value')
   *   .toJson();
   * const trie = TrieMap.fromJSON(json);
   * ```
   */
  public static fromJSON<T>(json: string): TrieMap<T> {
    const instance: TrieMap<T> = new this()
    instance.root = JSON.parse(json).root
    return instance
  }

  /**
   * Creates a new instance from existing data.
   * @param iterable - An interable that yields entries.
   * @example
   * ```js
   * const trie = TrieMap.fromIterable([
   *   [['some', 'path'], 'value1'],
   *   [['other', 'path'], 'value2']
   * ]);
   * ```
   */
  public static fromIterable<T>(iterable: Iterable<[string[], T]>): TrieMap<T> {
    const instance: TrieMap<T> = new this()
    return instance.load(iterable)
  }

  /**
   * The TrieMap data structure root.
   */
  public root: Record<string, Any>

  /**
   * Creates a new TrieMap instance.
   * @example
   * ```js
   * const trie = new TrieMap();
   * ```
   */
  public constructor() {
    this.root = Object.create(null)
  }

  /**
   * Returns the number of values in the TrieMap.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.
   *   .set(['some', 'path'], 'value')
   *   .count;
   * //=> 1
   * ```
   */
  public get count(): number {
    let c = 0
    this.forEach([], () => {
      c++
    })
    return c
  }

  /**
   * Deletes all entries from the TrieMap
   * @returns this/self (chainable)
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.set(['some', 'path'], 'value');
   * trie.clear();
   * trie.count;
   * //=> 0
   * ```
   */
  public clear(): TrieMap<T> {
    this.root = Object.create(null)
    return this
  }

  /**
   * Insert multiple entries into the TrieMap.
   * @param iterable - An array or other iterable that yields entries.
   * @returns this/self (chainable)
   * @example
   * ```js
   * const trie = new TrieMap().load([
   *   [['some', 'path'], 'value1'],
   *   [['other', 'path'], 'value2']
   * ]);
   * ```
   */
  public load(iterable: Iterable<[string[], T]>): TrieMap<T> {
    for (const [prefix, value] of iterable) {
      this.set(prefix, value)
    }
    return this
  }

  /**
   * Insert a value into the TrieMap.
   * @param prefix - A string array.
   * @param value - The value to insert.
   * @returns this/self (chainable)
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['some', 'path'], 'value1');
   *   .set(['other', 'path'], 'value2');
   * ```
   */
  public set(prefix: string[], value: T): TrieMap<T> {
    this.setNodeValue(this.setNode(this.validatePrefixInput(prefix)), value)
    return this
  }

  /**
   * Updates a value in the TrieMap.
   * @param prefix - A string array.
   * @param f - A function that when passed the current value, will return another replacement value.
   * @returns this/self (chainable)
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.set(['some', 'path'], 4);
   * trie.get(['some', 'path']);
   * //=> 4
   * trie.update(['some', 'path'], (value) => {
   *   return value + 2
   * });
   * trie.get(['some', 'path']);
   * //=> 6
   * ```
   */
  public update(prefix: string[], f: (value: T) => T): TrieMap<T> {
    const node = this.getNode(this.validatePrefixInput(prefix))
    if (node) {
      this.updateNodeValue(node, f)
    }
    return this
  }

  /**
   * Returns the value at a given prefix or undefined if no node is found.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.set(['some', 'path'], 4);
   * trie.get(['some', 'path']);
   * //=> 4
   * ```
   */
  public get(prefix: string[]): T | undefined {
    const node = this.getNode(this.validatePrefixInput(prefix))
    if (!node) return
    return this.getNodeValue(node)
  }

  /**
   * Returns the value at a given prefix.
   * @param prefix - A string array.
   * @throws {Error} if there is no value at the given prefix.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.get(['nonexistent', 'path']);
   * //=> undefined
   * trie.getStrict(['nonexistent', 'path']);
   * //=> throws Error
   * ```
   */
  public getStrict(prefix: string[]): T {
    const value = this.get(prefix)
    if (!value) throw new Error('Value not found.')
    return value
  }

  /**
   * Returns whether a value exists at the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.has(['some', 'path']);
   * //=> false
   * trie.set(['some', 'path'], 'value');
   * trie.has(['some', 'path']);
   * //=> true
   * ```
   */
  public has(prefix: string[]): boolean {
    const node = this.getNode(this.validatePrefixInput(prefix))
    return !!node && this.hasNodeValue(node)
  }

  /**
   * Deletes the value at the given prefix. Returns whether the operation was successful.
   * @param prefix - A string array.
   * @param prune - Whether or not to delete all values with the given prefix.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.set(['some', 'path'], 'value');
   * trie.has(['some', 'path']);
   * //=> true
   * trie.delete(['some', 'path']);
   * //=> true (means operation was successful)
   * trie.has(['some', 'path']);
   * //=> false
   * ```
   */
  public delete(prefix: string[]): boolean {
    prefix = this.validatePrefixInput(prefix)
    let node = this.root
    let toPrune = null
    let pruneKey = null
    let parent
    for (let i = 0; i < prefix.length; i++) {
      parent = node
      node = node[prefix[i]]
      // Prefix does not exist
      if (node === undefined) {
        return false
      }
      // Keeping track of a potential branch to prune
      const numKeys = Object.keys(node).length
      if (toPrune !== null) {
        if (numKeys > 1) {
          toPrune = null
          pruneKey = null
        }
      } else {
        if (numKeys < 2) {
          toPrune = parent
          pruneKey = prefix[i]
        }
      }
    }
    if (!this.hasNodeValue(node)) {
      return false
    }
    if (toPrune && pruneKey) {
      Reflect.deleteProperty(toPrune, pruneKey)
    } else {
      Reflect.deleteProperty(node, SENTINEL)
    }
    return true
  }

  /**
   * Deletes the value at the given prefix or all values with the given prefix if ´prune´ is set to true.
   * @param prefix - A string array.
   * @param prune - Whether or not to delete all values with the given prefix.
   * @throws {Error} if the operation was unsuccessful.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.delete(['nonexistent', 'path']);
   * //=> false (operation unsuccessful)
   * trie.deleteStrict(['nonexistent', 'path']);
   * //=> throws Error
   * ```
   */
  public deleteStrict(prefix: string[]): void {
    if (!this.delete(prefix)) {
      throw new Error('The node at the prefix not found: ' + prefix.join('/'))
    }
  }

  /**
   * Iterate each (value, prefix) with the given prefix.
   * @param prefix - A string array.
   * @param f - A callback function. Return true to terminate iteration.
   * @example
   * ```js
   * const directoryFileCounts = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 6)
   *   .set(['docs'], 8);
   * let totalFiles = 0;
   * directoryFileCounts.forEach([], (value, prefix) => {
   *   totalFiles += value;
   * });
   * // totalFiles (2 + 6 + 8) is now = 16
   * let totalSourceFiles = 0;
   * directoryFileCounts.forEach(['src'], (value, prefix) => {
   *   totalSourceFiles += value;
   * });
   * // totalSourceFiles (2 + 6) is now = 8
   * ```
   */
  public forEach(prefix: string[], f: (value: T, prefix: string[]) => void | boolean): TrieMap<T> {
    prefix = this.validatePrefixInput(prefix.slice())
    const value = this.get(prefix)
    if (value !== undefined) {
      f(value, prefix.slice())
    }
    let endRecursion = false
    ;(function recurse(node) {
      for (const key in node) {
        prefix.push(key)
        const value = node[key][SENTINEL]
        if (value !== undefined && !endRecursion) {
          if (f(value, prefix.slice())) {
            endRecursion = true
          }
        }
        if (key !== SENTINEL && !endRecursion) {
          recurse(node[key])
        }
        prefix.pop()
      }
    })(this.getNode(prefix) || {})
    return this
  }

  /**
   * Iterate each (value, prefix) with the given prefix and replace all elements using a callback function.
   * @param prefix - A string array.
   * @param f - A callback function.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.load([
   *   [['a'], 0],
   *   [['b'], 1],
   *   [['a', 'a'], 2],
   * ]);
   * trie.updateAll([], (value) => value + 1);
   * trie.get(['a']) // => 1
   * trie.get(['b']) // => 2
   * trie.get(['a', 'a']) // => 3
   * ```
   */
  public updateAll(prefix: string[], f: (value: T, prefix?: string[]) => T): TrieMap<T> {
    prefix = this.validatePrefixInput(prefix.slice())
    const value = this.get(prefix)
    if (value !== undefined) {
      this.set(prefix, f(value, prefix))
    }
    function recurse(node: Record<string, Any>) {
      for (const key in node) {
        prefix.push(key)
        const value = node[key][SENTINEL]
        if (value !== undefined) {
          node[key][SENTINEL] = f(value, prefix.slice())
        }
        if (key !== SENTINEL) {
          recurse(node[key])
        }
        prefix.pop()
      }
    }
    recurse(this.getNode(prefix) || {})
    return this
  }

  /**
   * Iterates all (value, prefix) where value === ´valueToFind´.
   * @param prefix - A string array.
   * @param valueToFind - The value to look for.
   * @param f - A callback function.
   * @example
   * ```js
   * const directoryFileCounts = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * const directoryPathsWithTwoFiles = [];
   * directoryFileCounts.find([], (value, prefix) => {
   *   if(value === 2) {
   *     directoryPathsWithTwoFiles.push(prefix);
   *   }
   * });
   * // directoryPathsWithTwoFiles will now contain: [
   * //   ['src', 'classes'],
   * //   ['src', 'modules']
   * // ]
   * ```
   */
  public find(prefix: string[], valueToFind: T, f: (value: T, prefix: string[]) => void): TrieMap<T> {
    this.forEach(prefix, (value, pre) => {
      if (value === valueToFind) {
        f(valueToFind, pre)
      }
    })
    return this
  }

  /**
   * Returns an array of alle values that begin with a specified precix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const directoryFileCounts = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 3)
   *   .set(['docs'], 8);
   * directoryFileCounts.getAll(['src']);
   * //=> [2, 3]
   * ```
   */
  public getValues(prefix: string[]): Array<T> {
    const result: Array<T> = []
    this.forEach(prefix, (value: T) => {
      result.push(value)
    })
    return result
  }

  /**
   * Returns an Iterable that yields each prefix in the TrieMap with the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * [...trie.keys()];
   * //=> [
   * //   ['src', 'classes'],
   * //   ['src', 'modules'],
   * //   ['docs']
   * // ]
   * ```
   */
  public *keys(prefix: string[] = []): Iterable<string[]> {
    const res: string[][] = []
    this.forEach(prefix, (_, pre) => {
      res.push(pre)
    })
    yield* res
  }

  /**
   * Returns an Iterable that yields each value in the TrieMap with the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * [...trie.values()];
   * //=> [2, 2, 8]
   * ```
   */
  public *values(prefix: string[] = []): Iterable<T> {
    const res: T[] = []
    this.forEach(prefix, (value: T) => {
      res.push(value)
    })
    yield* res
  }

  /**
   * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * [...trie.entries()];
   * //=> [
   * //   [['src', 'classes'], 2],
   * //   [['src', 'modules'], 2],
   * //   [['docs', 8]]
   * // ]
   * ```
   */
  public *entries(prefix: string[] = []): Iterable<[string[], T]> {
    const res: Array<[string[], T]> = []
    this.forEach(prefix, (value, pre) => {
      res.push([pre, value])
    })
    yield* res
  }

  /**
   * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * [...trie];
   * //=> [
   * //   [['src', 'classes'], 2],
   * //   [['src', 'modules'], 2],
   * //   [['docs', 8]]
   * // ]
   * ```
   */
  public *[Symbol.iterator](prefix?: string[]): Iterable<[string[], T]> {
    yield* this.entries(prefix)
  }

  /**
   * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
   * @param prefix - A string array.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * trie.toArray();
   * //=> [
   * //   [['src', 'classes'], 2],
   * //   [['src', 'modules'], 2],
   * //   [['docs', 8]]
   * // ]
   * ```
   */
  public toArray(prefix: string[] = []): Array<[string[], T]> {
    return [...this.entries(prefix)]
  }

  /**
   * Returns the trie map data structure as pretty printed JSON.
   * @param pretty - Whether to return a pretty formatted JSON string rather than a condensed machine readble string.
   * @example
   * ```js
   * const trie = new TrieMap()
   *   .set(['src', 'classes'], 2)
   *   .set(['src', 'modules'], 2)
   *   .set(['docs'], 8);
   * trie.toJson();
   * //=> "{root:{src:{classes:2,modules:2,},docs:8,}}"
   * trie.toJson(true);
   * //=> {
   * //   root: {
   * //     src: {
   * //       classes: 2,
   * //       modules: 2,
   * //     },
   * //     docs: 8,
   * //   },
   * // }
   * ```
   */
  public toJson(pretty = false): string {
    return JSON.stringify(this, null, pretty ? 2 : void 0)
  }

  protected setNode(prefix: string[]): Record<string, Any> {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      node = node[prefix[i]] || (node[prefix[i]] = Object.create(null))
    }
    return node
  }

  protected getNode(prefix: string[]): Record<string, Any> | undefined {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      node = node[prefix[i]]
      if (node === undefined) {
        return
      }
    }
    return node
  }

  protected setNodeValue(node: Record<string, Any>, value: T): void {
    node[SENTINEL] = value
  }

  protected updateNodeValue(node: Record<string, Any>, f: (value: T) => T): void {
    node[SENTINEL] = f(node[SENTINEL])
  }

  protected getNodeValue(node: Record<string, Any>): T | undefined {
    return node[SENTINEL]
  }

  protected deleteNodeValue(node: Record<string, Any>): boolean {
    return Reflect.deleteProperty(node, SENTINEL)
  }

  protected hasNodeValue(node: Record<string, Any>): boolean {
    return Object.hasOwn(node, SENTINEL)
  }

  protected validatePrefixInput(prefix: string[]): string[] {
    if (prefix.includes(SENTINEL)) {
      throw Error('Illegal prefix key. Single character string of CharCode 0 is reserved')
    }
    return prefix
  }
}

export default TrieMap
