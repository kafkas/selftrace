export default class MathUtils {
  /** @returns The absolute difference between 2 numbers. */
  static absdiff(num1: number, num2: number): number {
    return Math.abs(num1 - num2);
  }

  /** Generates a random integer between min and max (borders included). */
  static generateRandomInt(min: number, max: number): number {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + min;
  }

  // For now let's keep it simple with 4 params
  static weightedAvg(x1: number, w1: number, x2: number, w2: number): number {
    return (x1 * w1 + x2 * w2) / (w1 + w2);
  }
}
