import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { FontSize } from '../../../../unistyles';

type TextProps = RNTextProps & {
  size?: FontSize;
  bold?: boolean;
  center?: boolean;
};

export function Text({
  size = 'bodyMedium',
  bold = false,
  center = false,
  ...props
}: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        styles.base(size),
        bold && styles.bold,
        center && styles.center,
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  base: (size: FontSize) => ({
    color: theme.colors.onSurface,
    fontSize: theme.text(size),
    fontWeight: 'normal',
  }),
  bold: {
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
}));
