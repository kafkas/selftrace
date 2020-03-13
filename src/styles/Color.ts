/**
 * An immutable data type that represents a color. Uses r, g, b values internally.
 */
export default class Color {
  private red: number;
  private green: number;
  private blue: number;

  constructor(red: number, green: number, blue: number) {
    Color.validateRGB(red, green, blue);
    this.red = red;
    this.green = green;
    this.blue = blue;
    Object.freeze(this);
  }

  private static validateRGB(red: number, green: number, blue: number): void {
    function validateField(field: 'red' | 'green' | 'blue', value: number) {
      if (!Number.isSafeInteger(value) || value < 0 || value > 255)
        throw new Error(
          `${field} value must be a safe integer between 0 and 255.`
        );
    }
    validateField('red', red);
    validateField('green', green);
    validateField('blue', blue);
  }

  /**
   * Returns an HSL color string, adjusting lightness as specified.
   * @param {number} percent - The number of percentage points to add to or subtract
   * from the L component of the current HSL value. Overflow is prevented if percent
   * is too large or too small.
   * @param {boolean} exact - Set to true, if you would like the lightness of the
   * returned value to be exactly `percent`.
   * @returns {string} color string in hsl(h, s%, l%) format
   */
  lighten(percent: number, exact?: boolean): string {
    const hsl = Color.rgbToHsl(this.red, this.green, this.blue);
    let l = percent;
    if (!exact) l += hsl[2];
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${l}%)`;
  }

  /**
   * Returns an HSL color string, adjusting saturation as specified.
   * @param {number} percent - The number of percentage points to add to or subtract
   * from the S component of the current HSL value. If `exact` is set to true, saturation
   * will be set to exactly `percent`.
   * @param {boolean} exact - Set to true, if you would like the saturation of the
   * returned value to be exactly `percent`.
   * @returns {string} color string in hsl(h, s%, l%) format
   */
  saturate(percent: number, exact?: boolean): string {
    const hsl = Color.rgbToHsl(this.red, this.green, this.blue);
    let s = percent;
    if (!exact) s += hsl[1];
    return `hsl(${hsl[0]}, ${s}%, ${hsl[2]}%)`;
  }

  /**
   * @author Michael Jackson - github.com/mjackson
   * @see https://gist.github.com/mjackson/5311256
   */
  private static rgbToHsl(red: number, green: number, blue: number): number[] {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number;
    let s: number;
    let l = (max + min) / 2;
    if (max === min) {
      // achromatic
      h = 0;
      s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
      }
      h /= 6;
    }
    h = Math.round(360 * h);
    s = Math.round(100 * s);
    l = Math.round(100 * l);
    return [h, s, l];
  }

  /**
   * Returns a shade of the color, by a specified amount, in string format.
   * @param {number} percent - Level of brightness
   * @returns {string} a brighter color if percent is positive,
   * the same color if percent === 0 and a darker color otherwise
   */
  shade(percent: number): string {
    if (percent < -100 || percent > 100)
      throw new Error('percent must be a number between -100 and 100.');
    /**
     * Scales a number by percent parameter, keeping it within legal (r, g, b) bounds.
     * @param {number} field - Value to be scaled
     * @returns {number} scaled value
     */
    function scale(field: number) {
      const res = Math.round(field * ((100 + percent) / 100));
      return res > 255 ? 255 : res;
    }
    return Color.makeRGBString(
      scale(this.red),
      scale(this.green),
      scale(this.blue)
    );
  }

  /** @returns String representation of the color in rgb(r, g, b) format */
  toString() {
    return Color.makeRGBString(this.red, this.green, this.blue);
  }

  private static makeRGBString(
    red: number,
    green: number,
    blue: number
  ): string {
    return `rgb(${red}, ${green}, ${blue})`;
  }
}
