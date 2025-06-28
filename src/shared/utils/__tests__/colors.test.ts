import { hexToRgb, rgbObjectToString } from '../colors';

describe('colors utility functions', () => {
  describe('hexToRgb', () => {
    it('should convert hex color to RGB', () => {
      expect(hexToRgb('#FF5733')).toEqual({ r: 255, g: 87, b: 51 });
      expect(hexToRgb('#F53')).toEqual({ r: 255, g: 85, b: 51 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should throw an error for invalid hex format', () => {
      expect(() => hexToRgb('#GGG')).toThrow('Invalid hex color format');
      expect(() => hexToRgb('123456')).toThrow('Invalid hex color format');
      expect(() => hexToRgb('#12345')).toThrow('Invalid hex color format');
    });
  });

  describe('rgbObjectToString', () => {
    it('should convert RGB object to string', () => {
      expect(rgbObjectToString({ r: 255, g: 87, b: 51 })).toBe(
        'rgb(255, 87, 51)',
      );
      expect(rgbObjectToString({ r: 0, g: 0, b: 0 })).toBe('rgb(0, 0, 0)');
      expect(rgbObjectToString({ r: 255, g: 255, b: 255 })).toBe(
        'rgb(255, 255, 255)',
      );
    });

    it('should throw an error for out of range RGB values', () => {
      expect(() => rgbObjectToString({ r: -1, g: 0, b: 0 })).toThrow(
        'RGB values must be between 0 and 255',
      );
      expect(() => rgbObjectToString({ r: 256, g: 0, b: 0 })).toThrow(
        'RGB values must be between 0 and 255',
      );
      expect(() => rgbObjectToString({ r: 0, g: -1, b: 0 })).toThrow(
        'RGB values must be between 0 and 255',
      );
      expect(() => rgbObjectToString({ r: 0, g: 256, b: 0 })).toThrow(
        'RGB values must be between 0 and 255',
      );
      expect(() => rgbObjectToString({ r: 0, g: 0, b: -1 })).toThrow(
        'RGB values must be between 0 and 255',
      );
      expect(() => rgbObjectToString({ r: 0, g: 0, b: 256 })).toThrow(
        'RGB values must be between 0 and 255',
      );
    });
  });
});
