import type { ColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import type { UnistylesThemes } from 'react-native-unistyles';
import { StyleSheet } from 'react-native-unistyles';

type ThemeColorKey =
  | keyof UnistylesThemes['light']['colors']
  | keyof UnistylesThemes['dark']['colors'];

type AppIconProps = {
  icon: React.ElementType<SvgProps>;
  size?: number;
  color?: ThemeColorKey;
  fill?: ColorValue;
};

export function AppIcon({
  icon: IconComponent,
  size = 24,
  color,
  fill,
}: AppIconProps) {
  return (
    <IconComponent
      width={size}
      height={size}
      fill={fill ?? (color ? styles.icon(color).color : undefined)}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  icon: (color: ThemeColorKey) => ({
    color: theme.colors[color] ?? theme.colors.onSurface,
  }),
}));
