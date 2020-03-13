export default class ObjectUtils {
  /**
   * Changes the value of a key at a specified address of a specified object.
   * Creates a key for any undefined key in `address`. Mutates `obj`.
   *
   * @param obj - Any object
   * @param address - The address of the key which needs to be updated.
   * @param value - The new value of the key at the address.
   *
   * @example
   *
   * const obj = {
   *  color: 'red',
   *  dimensions: {
   *    width: 100,
   *    height: 50,
   *  }
   * };
   *
   * modifyObject(obj, ['dimensions', 'width'], 50);
   *
   * const mutatedObj = {
   *  color: 'red',
   *  dimensions: {
   *    width: 50,
   *    height: 50,
   *  }
   * };
   */
  static modify<T>(obj: object, address: string[], value: T): void {
    const n = address.length;
    if (n === 0) return obj;
    let cur = obj;
    if (n === 1) {
      cur[address[0]] = value;
      return cur;
    }
    for (let i = 0; i < n; i += 1) {
      const key = address[i];
      const nextKey = address[i + 1];
      if (!cur[key]) cur[key] = {};
      cur = cur[key];
      if (i === n - 2) {
        cur[nextKey] = value;
        break;
      }
    }
    return obj;
  }

  /**
   * @param obj The original object
   * @param keys A set of keys that need to be omitted
   * @return A copy of the specified object, excluding the specified keys
   */
  static copyExcept<T>(obj: T, keys: Set<string>): Partial<T> {
    if (!obj) throw new Error('You must pass an object as the first input');
    const copy = {};
    for (const key in obj) {
      if (!keys || !keys.has(key)) copy[key] = obj[key];
    }
    return copy;
  }
}
