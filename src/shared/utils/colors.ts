/**
 * Converts hexadecimal color to it's equivalent RGBA value.
 *
 * @param hexColor The hex colors to convert, must start with '#'
 * @param alpha The alpha value to apply to the returned RGBA value
 */
export const hexToRgbRGBA = (hexColor: string, alpha = 1) => {
  const match = hexColor.match(/^#(?<hex>[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
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

  const rgb = {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };

  const alphaChannel = alpha > 1 ? alpha / 100 : alpha;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaChannel})`;
};
