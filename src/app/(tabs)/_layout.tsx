import IconCrown from '@material-symbols/svg-400/rounded/crown.svg';
import IconCrownFilled from '@material-symbols/svg-400/rounded/crown-fill.svg';
import IconHome from '@material-symbols/svg-400/rounded/home.svg';
import IconHomeFilled from '@material-symbols/svg-400/rounded/home-fill.svg';
import IconSettings from '@material-symbols/svg-400/rounded/instant_mix.svg';
import IconSettingsFilled from '@material-symbols/svg-400/rounded/instant_mix-fill.svg';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { AppIcon } from '#/shared/components/ui/AppIcon';
import { useAuthStore } from '#/shared/stores/authStore';

export default function TabsLayout() {
  const isVip = useAuthStore((state) => state.isVip);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: HomeIcon }}
      />
      <Tabs.Protected guard={isVip}>
        <Tabs.Screen
          name="vip"
          options={{ title: 'VIP', tabBarIcon: VipIcon }}
        />
      </Tabs.Protected>
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings', tabBarIcon: SettingsIcon }}
      />
    </Tabs>
  );
}

type TabBarIconProps = {
  focused: boolean;
  color: ColorValue;
  size: number;
};

const HomeIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconHomeFilled : IconHome}
    size={size}
    fill={color}
  />
);
const VipIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconCrownFilled : IconCrown}
    size={size}
    fill={color}
  />
);
const SettingsIcon = ({ focused, color, size }: TabBarIconProps) => (
  <AppIcon
    icon={focused ? IconSettingsFilled : IconSettings}
    size={size}
    fill={color}
  />
);
