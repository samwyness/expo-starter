import { renderHook } from '@testing-library/react-native';

import { useClientOnlyValue } from '../useClientOnlyValue';

describe('useClientOnlyValue', () => {
  it('should return the correct value for clients', () => {
    // Arrange
    const { result } = renderHook(() => useClientOnlyValue(false, true));

    // Act

    // Assert
    expect(result.current).toBe(true);
  });
});
