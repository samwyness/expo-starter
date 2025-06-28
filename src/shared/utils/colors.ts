type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Converts a hex color string to an RGB object.
 *
 * The function supports both 3-digit shorthand hex codes (e.g., "#RGB")
 * and 6-digit hex codes (e.g., "#RRGGBB"). It returns an object
 * with properties `r`, `g`, and `b` representing the red, green, and blue
 * components of the color, respectively.
 *
 * @param hex - The hex color string (e.g. "#RRGGBB" or "#RGB").
 * @throws Will throw an error if the hex format is invalid.
 * @returns An object with properties `r`, `g`, and `b` representing the red, green, and blue components of the color.
 */
export function hexToRgb(hex: string): RGB {
  const match = hex.match(/^#(?<hex>[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
  if (!match || !match.groups) {
    throw new Error('Invalid hex color format');
  }

  let hexValue = match.groups.hex;
  if (hexValue.length === 3) {
    hexValue = hexValue
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const num = parseInt(hexValue, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

/**
 * Converts an RGB object to a string in the format "rgb(r, g, b)".
 *
 * @param rgb - An object representing RGB color with properties `r`, `g`, and `b`.
 * Each property should be a number between 0 and 255.
 * @throws Will throw an error if any of the RGB values are out of range (0-255).
 * @returns A string in the format "rgb(r, g, b)" where `r`, `g`, and `b` are the respective color components.
 */
export function rgbObjectToString(rgb: RGB): string {
  const values = [rgb.r, rgb.g, rgb.b];
  if (values.some((v) => v < 0 || v > 255)) {
    throw new Error('RGB values must be between 0 and 255');
  }

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
