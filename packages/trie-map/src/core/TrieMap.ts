const SENTINEL = Symbol('SENTINEL')
const SENTINEL_STRING = '🔥'

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
  static fromJSON<T>(json: string, revive: (value: unknown) => T = (value: unknown): T => value as T): TrieMap<T> {
    const instance = new this<T>()
    instance.root = JSON.parse(JSON.parse(json).root)
    instance.forEachNode(
      [],
      (node) => {
        node[SENTINEL] = revive(node[SENTINEL_STRING])
        delete node[SENTINEL_STRING]
      },
      SENTINEL_STRING
    )
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
  static fromIterable<T>(iterable: Iterable<[string[], T]>): TrieMap<T> {
    const instance: TrieMap<T> = new this()
    return instance.load(iterable)
  }

  /**
   * The TrieMap data structure root.
   */
  root: TTrieMapNode<T>

  /**
   * Creates a new TrieMap instance.
   * @example
   * ```js
   * const trie = new TrieMap();
   * ```
   */
  constructor() {
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
  get count(): number {
    return this.countFrom([])
  }

  /**
   * Returns the number of values in the TrieMap from a given prefix.
   * @example
   * ```js
   * const trie = new TrieMap();
   * trie.
   *   .set(['some1', 'path'], 'value')
   *   .set(['some2', 'path'], 'value')
   *   .countFrom(['some1']);
   * //=> 1
   * ```
   */
  countFrom(prefix: string[]): number {
    let c = 0
    this.forEachNode(prefix, () => {
      c++
    })
    return c
  }

  /**
   * Deletes all entries from the TrieMap.
   * Also deletes every property key to which its value is a value in the TrieMap.
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
  clear(): this {
    this.forEachNode([], (node) => {
      Reflect.deleteProperty(node, SENTINEL)
    })
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
  load(iterable: Iterable<[string[], T]>): TrieMap<T> {
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
  set(prefix: string[], value: T): TrieMap<T> {
    this.setNode(prefix)[SENTINEL] = value
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
  update(prefix: string[], f: (value: T) => T): TrieMap<T> {
    const node = this.getNode(prefix)
    if (node) {
      node[SENTINEL] = f(node[SENTINEL])
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
  get(prefix: string[]): T | undefined {
    const node = this.getNode(prefix)
    if (!node) return
    return node[SENTINEL]
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
  getStrict(prefix: string[]): T {
    const value = this.get(prefix)
    if (!value) throw new Error('No value found at prefix: ' + this.prefixToString(prefix))
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
  has(prefix: string[]): boolean {
    const node = this.getNode(prefix)
    return !!node && SENTINEL in node
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
  delete(prefix: string[]): boolean {
    prefix = prefix.slice()
    const node = this.getNode(prefix)
    if (!node || !Object.hasOwn(node, SENTINEL)) {
      return false
    }
    Reflect.deleteProperty(node, SENTINEL)
    const keys = Object.keys(node)
    if (keys.length) return true
    if (!prefix.length) return true
    const key = prefix.pop() as string
    const parent = this.getNode(prefix)
    if (!parent) return true
    Reflect.deleteProperty(parent, key)
    return true

    // let node = this.root
    // let toPrune = null
    // let pruneKey = null
    // let parent
    // let key
    // for (let i = 0; i < prefix.length; i++) {
    //   key = prefix[i]
    //   parent = node
    //   node = node[key]
    //   // Prefix does not exist
    //   if (node === undefined) {
    //     return false
    //   }
    //   // Keeping track of a potential branch to prune
    //   const numKeys = Object.keys(node).length
    //   if (toPrune !== null) {
    //     if (numKeys > 1) {
    //       toPrune = null
    //       pruneKey = null
    //     }
    //   } else {
    //     if (numKeys < 2) {
    //       toPrune = parent
    //       pruneKey = key
    //     }
    //   }
    // }
    // if (!(Object.hasOwn(node, SENTINEL))) {
    //   return false
    // }
    // if (toPrune && pruneKey) {
    //   Reflect.deleteProperty(toPrune, pruneKey)
    // } else {
    //   Reflect.deleteProperty(node, SENTINEL)
    // }
    // return true
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
  deleteStrict(prefix: string[]): void {
    if (!this.delete(prefix)) {
      throw new Error('The node at the prefix not found: ' + this.prefixToString(prefix))
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
  forEach(prefix: string[], f: (value: T, prefix: string[]) => void | boolean): TrieMap<T> {
    return this.forEachNode(prefix, (node, prefix) => {
      return f(node[SENTINEL], prefix)
    })
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
  updateAll(prefix: string[], f: (value: T, prefix?: string[]) => T): TrieMap<T> {
    return this.forEachNode(prefix, (node, pre) => {
      node[SENTINEL] = f(node[SENTINEL], pre)
    })
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
  find(prefix: string[], valueToFind: T, f: (value: T, prefix: string[]) => void): TrieMap<T> {
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
  getValues(prefix: string[]): Array<T> {
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
  *keys(prefix: string[] = []): Iterable<string[]> {
    const res: string[][] = []
    this.forEachNode(prefix, (_, pre) => {
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
  *values(prefix: string[] = []): Iterable<T> {
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
  *entries(prefix: string[] = []): Iterable<[string[], T]> {
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
  *[Symbol.iterator](prefix?: string[]): Iterable<[string[], T]> {
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
  toArray(prefix: string[] = []): Array<[string[], T]> {
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
  toJson(pretty = false): string {
    return JSON.stringify(this.toJSON(), null, pretty ? 2 : undefined)
  }

  toJSON() {
    const serialized = JSON.stringify(this.root, (key, value) => {
      if (value != null && typeof value === 'object' && Object.hasOwn(value, SENTINEL)) {
        return { [SENTINEL_STRING]: value[SENTINEL], ...value }
      } else return value
    })
    return { root: serialized }
  }

  /**
   * Visits only nodes that have a value.
   */
  protected forEachNode(
    prefix: string[],
    f: (node: TTrieMapNode<T>, prefix: string[]) => void | boolean,
    sentinel: string | symbol = SENTINEL
  ): TrieMap<T> {
    prefix = prefix.slice()
    const node = this.getNode(prefix)
    if (!node) return this
    if (Object.hasOwn(node, sentinel)) {
      if (f(node, prefix.slice())) {
        return this
      }
    }
    let endRecursion = false
    function recurse(node: TTrieMapNode<T>) {
      for (const key in node) {
        if (Object.hasOwn(node[key], sentinel) && !endRecursion) {
          if (f(node[key], prefix.concat(key))) {
            endRecursion = true
          }
        }
        prefix.push(key)
        recurse(node[key])
        prefix.pop()
      }
    }
    recurse(node)
    return this
  }

  *iterateChildren(prefix: string[]): Generator<TTrieMapYield<T>> {
    const node = this.getNode(prefix)
    if (!node) return
    for (const key in node) {
      if (Object.hasOwn(node[key], SENTINEL)) {
        yield [node[key][SENTINEL], prefix.concat(key)]
      }
    }
  }

  *iterateNodesDFS(prefix: string[]): Generator<TTrieMapNodeYield<T>> {
    const node = this.getNode(prefix)
    if (!node) return
    prefix = prefix.slice()
    function* recurse(node: TTrieMapNode<T>, prefix: string[]): Generator<TTrieMapNodeYield<T>> {
      if (Object.hasOwn(node, SENTINEL)) {
        yield [node, prefix]
      }
      for (const key in node) {
        yield* recurse(node[key], prefix.concat(key))
      }
    }
    yield* recurse(node, prefix)
  }

  *iterateNodesBFS(prefix: string[]): Generator<TTrieMapNodeYield<T>> {
    const node = this.getNode(prefix)
    if (!node) return
    prefix = prefix.slice()
    const stack: TTrieMapNodeYield<T>[] = []

    const res = [node, prefix] as TTrieMapNodeYield<T>
    if (Object.hasOwn(node, SENTINEL)) {
      yield res
    }
    stack.push(res)

    while (stack.length > 0) {
      const [currentNode, currentPrefix] = stack.pop() as TTrieMapNodeYield<T>
      for (const key in currentNode) {
        const res = [currentNode[key], currentPrefix.concat(key)] as TTrieMapNodeYield<T>
        if (Object.hasOwn(res[0], SENTINEL)) {
          yield res
        }
        stack.push(res)
      }
    }
  }

  protected setNode(prefix: string[]): TTrieMapNode<T> {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      const key = prefix[i]
      if (node[key] === undefined) {
        node[key] = Object.create(null)
      }
      node = node[key]
    }
    return node
  }

  protected getNode(prefix: string[]): TTrieMapNode<T> | undefined {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      node = node[prefix[i]]
      if (node === undefined) {
        return
      }
    }
    return node
  }

  protected prefixToString(prefix: string[]): string {
    return '[' + prefix.join(', ') + ']'
  }
}

export default TrieMap

export interface TTrieMapNode<T> {
  [SENTINEL]: T
  [key: string]: TTrieMapNode<T>
}

export type TTrieMapNodeEntry<T> = [prefix: string[], node: TTrieMapNode<T>]
export type TTrieMapNodeYield<T> = [node: TTrieMapNode<T>, prefix: string[]]

export type TTrieMapEntry<T> = [prefix: string[], value: T]
export type TTrieMapYield<T> = [value: T, prefix: string[]]

const t = new TrieMap<boolean>()

// t.set([].map(String), true)
t.set([1, 1, 1].map(String), true)
t.set([1, 1, 2].map(String), true)
t.set([1, 1, 3].map(String), true)
t.set([1, 2, 1].map(String), true)

console.log([...t.iterateNodesBFS([])].map((e) => e[1]))
console.log([...t.iterateNodesDFS([])].map((e) => e[1]))
