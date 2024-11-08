import { renderHook } from '@testing-library/react-native';

import { useColorScheme as useColorSchemeWeb } from '../useColorScheme.web';

describe('useColorScheme', () => {
  it('should return the correct color scheme for web', () => {
    // Arrange
    const { result } = renderHook(() => useColorSchemeWeb());

    // Act

    // Assert
    expect(result.current).toBe('light');
  });
});
