import type { TextProps as RNTextProps } from 'react-native';
import { Text as RNText } from 'react-native';

type TextProps = RNTextProps;

export function Text(props: TextProps) {
  return <RNText className="text-base text-onSurface" {...props} />;
}
