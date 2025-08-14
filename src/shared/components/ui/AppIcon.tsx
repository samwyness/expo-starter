import type { ColorValue } from 'react-native';
import type { SvgProps } from 'react-native-svg';

type AppIconProps = {
  icon: React.ElementType<SvgProps>;
  size?: number;
  color?: ColorValue;
};

export function AppIcon({
  icon: IconComponent,
  size = 24,
  color,
}: AppIconProps) {
  console.log({ color });
  return <IconComponent width={size} height={size} fill={color} />;
}
