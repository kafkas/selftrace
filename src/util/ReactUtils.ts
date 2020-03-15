export default class ReactUtils {
  static generateListKey(): string {
    const root = Math.random();
    const str = root.toString(36);
    const timestamp = Date.now().toString();

    return str.substring(2, str.length) + timestamp.substring(8);
  }
}
