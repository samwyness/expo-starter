import type { SvgProps } from 'react-native-svg';

import { useAppTheme } from '#/shared/theme/AppThemeProvider';

type AppIconProps = {
  icon: React.ElementType<SvgProps>;
  size?: number;
  color?: string;
};

export function AppIcon({
  icon: IconComponent,
  size = 24,
  color,
}: AppIconProps) {
  const { themeColors } = useAppTheme();
  return (
    <IconComponent
      width={size}
      height={size}
      fill={color ?? themeColors.onSurface}
    />
  );
}
