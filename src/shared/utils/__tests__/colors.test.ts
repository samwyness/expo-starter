import { hexToRgbRGBA } from '../colors';

describe('hexToRgbRGBA', () => {
  it('should convert hex color to rgba with default alpha', () => {
    // Arrange
    const hexColor = '#ff5733';

    // Act
    const result = hexToRgbRGBA(hexColor);

    // Assert
    expect(result).toBe('rgba(255, 87, 51, 1)');
  });

  it('should convert hex color to rgba with provided alpha less than 1', () => {
    // Arrange
    const hexColor = '#00ff00';
    const alpha = 0.5;

    // Act
    const result = hexToRgbRGBA(hexColor, alpha);

    // Assert
    expect(result).toBe('rgba(0, 255, 0, 0.5)');
  });

  it('should convert hex color to rgba with provided alpha greater than 1 (percentage)', () => {
    // Arrange
    const hexColor = '#0000ff';
    const alpha = 50;

    // Act
    const result = hexToRgbRGBA(hexColor, alpha);

    // Assert
    expect(result).toBe('rgba(0, 0, 255, 0.5)');
  });
});
