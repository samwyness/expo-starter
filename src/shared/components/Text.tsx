import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { FontSize, FontWeight } from '#/shared/lib/unistyles';

type TextProps = RNTextProps & {
  size?: FontSize;
  weight?: FontWeight;
  center?: boolean;
};

export function Text({
  size = 'bodyMedium',
  weight = 'normal',
  center = false,
  ...props
}: TextProps) {
  return (
    <RNText
      {...props}
      style={[styles.base(size, weight), center && styles.center, props.style]}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  base: (size: FontSize, weight: FontWeight) => ({
    color: theme.colors.onSurface,
    fontWeight: theme.fontWeights[weight],
    fontSize: theme.fontSize[size],
    lineHeight: theme.lineHeight(size, 'normal'),
  }),
  center: {
    textAlign: 'center',
  },
}));
